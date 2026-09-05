import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { buildPagination, normalizePagination } from '../common/pagination/pagination.helper';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import {
  PatientEntity,
  VisitEntity,
} from '../database/entities';
import { CreateVisitDto } from './dto/visit.dto';
import { ConditionResolverService } from './services/condition-resolver.service';
import { SeverityCalculatorService } from './services/severity-calculator.service';
import { VitalsValidatorService } from './services/vitals-validator.service';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(VisitEntity)
    private readonly visitRepository: Repository<VisitEntity>,
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    private readonly conditionResolver: ConditionResolverService,
    private readonly vitalsValidator: VitalsValidatorService,
    private readonly severityCalculator: SeverityCalculatorService,
  ) {}

  async create(user: JwtPayload, dto: CreateVisitDto) {
    const patient = await this.patientRepository.findOne({
      where: { id: dto.patientId, clinicId: user.clinicId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const condition = await this.conditionResolver.resolve(dto.condition);
    const vitals = await this.vitalsValidator.validate(condition, dto.vitals);
    const severity = await this.severityCalculator.calculate(vitals);

    const visit = await this.visitRepository.save(
      this.visitRepository.create({
        patientId: patient.id,
        clinicId: user.clinicId,
        recordedByUserId: user.sub,
        conditionId: condition.id,
        conditionSlug: condition.slug,
        vitals,
        severity,
        notes: dto.notes?.trim() || undefined,
        visitDate: dto.visitDate ? new Date(dto.visitDate) : new Date(),
      }),
    );

    return {
      message: 'Visit recorded successfully',
      statusCode: 201,
      data: this.toVisitDto(visit),
    };
  }

  async findRecords(user: JwtPayload, query: PaginationQueryDto) {
    const { page, limit, skip } = normalizePagination(query.page, query.limit);
    const qb = this.visitRepository
      .createQueryBuilder('visit')
      .leftJoinAndSelect('visit.patient', 'patient')
      .where('visit.clinicId = :clinicId', { clinicId: user.clinicId });

    if (query.q?.trim()) {
      const search = `%${query.q.trim().toLowerCase()}%`;
      qb.andWhere(
        new Brackets((sub) => {
          sub
            .where('LOWER(patient.name) LIKE :search', { search })
            .orWhere('LOWER(patient.uniqueId) LIKE :search', { search })
            .orWhere('patient.contactNumber LIKE :search', { search })
            .orWhere('LOWER(visit.conditionSlug) LIKE :search', { search });
        }),
      );
    }

    const [visits, totalItems] = await qb
      .orderBy('visit.visitDate', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      message: 'Visit records retrieved successfully',
      data: visits.map((visit) => ({
        visit: this.toVisitDto(visit),
        patient: this.toPatientSummary(visit.patient),
      })),
      pagination: buildPagination(page, limit, totalItems),
    };
  }

  async findOne(user: JwtPayload, id: string) {
    const visit = await this.visitRepository.findOne({
      where: { id, clinicId: user.clinicId },
      relations: ['patient'],
    });

    if (!visit) {
      throw new NotFoundException('Visit not found');
    }

    return {
      message: 'Visit retrieved successfully',
      data: {
        visit: this.toVisitDto(visit),
        patient: this.toPatientSummary(visit.patient),
      },
    };
  }

  async findByPatient(user: JwtPayload, patientId: string, query: PaginationQueryDto) {
    const patient = await this.patientRepository.findOne({
      where: { id: patientId, clinicId: user.clinicId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const { page, limit, skip } = normalizePagination(query.page, query.limit);

    const [visits, totalItems] = await this.visitRepository.findAndCount({
      where: { patientId, clinicId: user.clinicId },
      order: { visitDate: 'DESC' },
      skip,
      take: limit,
    });

    return {
      message: 'Patient visits retrieved successfully',
      data: visits.map((visit) => this.toVisitDto(visit)),
      pagination: buildPagination(page, limit, totalItems),
    };
  }

  private toVisitDto(visit: VisitEntity) {
    return {
      id: visit.id,
      patientId: visit.patientId,
      condition: visit.conditionSlug,
      vitals: visit.vitals,
      severity: visit.severity,
      notes: visit.notes,
      visitDate: visit.visitDate.toISOString(),
      createdAt: visit.createdAt.toISOString(),
    };
  }

  private toPatientSummary(patient: PatientEntity) {
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
