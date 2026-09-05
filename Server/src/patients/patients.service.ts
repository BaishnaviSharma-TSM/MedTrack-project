import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { buildPagination, normalizePagination } from '../common/pagination/pagination.helper';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { PatientEntity, VisitEntity } from '../database/entities';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(VisitEntity)
    private readonly visitRepository: Repository<VisitEntity>,
  ) {}

  async create(user: JwtPayload, dto: CreatePatientDto) {
    const uniqueId = await this.nextUniqueId(user.clinicId);

    const patient = await this.patientRepository.save(
      this.patientRepository.create({
        clinicId: user.clinicId,
        createdByUserId: user.sub,
        name: dto.name.trim(),
        age: dto.age,
        gender: dto.gender,
        contactNumber: dto.contactNumber.trim(),
        uniqueId,
      }),
    );

    return {
      message: 'Patient created successfully',
      statusCode: 201,
      data: this.toPatientDto(patient),
    };
  }

  async findAll(user: JwtPayload, query: PaginationQueryDto) {
    const { page, limit, skip } = normalizePagination(query.page, query.limit);
    const qb = this.buildPatientQuery(user.clinicId, query.q);

    const [items, totalItems] = await qb
      .orderBy('patient.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      message: 'Patients retrieved successfully',
      data: items.map((patient) => this.toPatientDto(patient)),
      pagination: buildPagination(page, limit, totalItems),
    };
  }

  async findRecords(user: JwtPayload, query: PaginationQueryDto) {
    const { page, limit, skip } = normalizePagination(query.page, query.limit);
    const qb = this.buildPatientQuery(user.clinicId, query.q);

    const [patients, totalItems] = await qb
      .orderBy('patient.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const records = await Promise.all(
      patients.map(async (patient) => {
        const visits = await this.visitRepository.find({
          where: { patientId: patient.id, clinicId: user.clinicId },
          order: { visitDate: 'DESC' },
        });

        const latestVisit = visits[0];

        return {
          patient: this.toPatientDto(patient),
          lastVisitDate: latestVisit?.visitDate.toISOString() ?? patient.createdAt.toISOString(),
          lastCondition: latestVisit?.conditionSlug,
          visitCount: visits.length,
        };
      }),
    );

    return {
      message: 'Patient records retrieved successfully',
      data: records,
      pagination: buildPagination(page, limit, totalItems),
    };
  }

  async findOne(user: JwtPayload, id: string) {
    const patient = await this.patientRepository.findOne({
      where: { id, clinicId: user.clinicId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return {
      message: 'Patient retrieved successfully',
      data: this.toPatientDto(patient),
    };
  }

  async update(user: JwtPayload, id: string, dto: UpdatePatientDto) {
    const patient = await this.patientRepository.findOne({
      where: { id, clinicId: user.clinicId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    if (dto.name !== undefined) patient.name = dto.name.trim();
    if (dto.age !== undefined) patient.age = dto.age;
    if (dto.gender !== undefined) patient.gender = dto.gender;
    if (dto.contactNumber !== undefined) {
      patient.contactNumber = dto.contactNumber.trim();
    }

    const saved = await this.patientRepository.save(patient);

    return {
      message: 'Patient updated successfully',
      data: this.toPatientDto(saved),
    };
  }

  private buildPatientQuery(clinicId: string, q?: string) {
    const qb = this.patientRepository
      .createQueryBuilder('patient')
      .where('patient.clinicId = :clinicId', { clinicId });

    if (q?.trim()) {
      const search = `%${q.trim().toLowerCase()}%`;
      qb.andWhere(
        new Brackets((sub) => {
          sub
            .where('LOWER(patient.name) LIKE :search', { search })
            .orWhere('LOWER(patient.uniqueId) LIKE :search', { search })
            .orWhere('patient.contactNumber LIKE :search', { search });
        }),
      );
    }

    return qb;
  }

  private async nextUniqueId(clinicId: string) {
    const patients = await this.patientRepository.find({ where: { clinicId } });
    const maxNum = patients.reduce((max, patient) => {
      const match = patient.uniqueId.match(/^PT-(\d+)$/);
      const num = match ? Number(match[1]) : 0;
      return Math.max(max, num);
    }, 0);

    return `PT-${String(maxNum + 1).padStart(3, '0')}`;
  }

  private toPatientDto(patient: PatientEntity) {
    return {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      contactNumber: patient.contactNumber,
      uniqueId: patient.uniqueId,
      createdAt: patient.createdAt.toISOString(),
      updatedAt: patient.updatedAt.toISOString(),
    };
  }
}
