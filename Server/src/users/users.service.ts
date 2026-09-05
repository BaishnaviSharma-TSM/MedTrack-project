import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { buildPagination, normalizePagination } from '../common/pagination/pagination.helper';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UserEntity } from '../database/entities';
import { RegisterStaffDto, UpdateProfileDto } from './dto/user.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['clinic'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'Profile retrieved successfully',
      data: this.toProfileDto(user),
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.fullName = dto.fullName.trim();
    user.specialty = dto.specialty?.trim() ?? '';
    user.phone = dto.phone?.trim() ?? '';

    const saved = await this.userRepository.save(user);
    const withClinic = await this.userRepository.findOne({
      where: { id: saved.id },
      relations: ['clinic'],
    });

    return {
      message: 'Profile updated successfully',
      data: this.toProfileDto(withClinic!),
    };
  }

  private toProfileDto(user: UserEntity) {
    return {
      id: user.id,
      doctorId: user.staffCode,
      fullName: user.fullName,
      specialty: user.specialty,
      clinic: user.clinic?.name ?? '',
      phone: user.phone,
      role: user.role,
      email: user.email,
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}

@Injectable()
export class StaffRegistrationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerStaff(admin: JwtPayload, dto: RegisterStaffDto) {
    if (dto.role !== Role.Doctor && dto.role !== Role.Nurse) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: [{ field: 'role', message: 'Role must be doctor or nurse.' }],
      });
    }

    const existing = await this.userRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (existing) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: [{ field: 'email', message: 'Email is already registered.' }],
      });
    }

    const staffCode = await this.nextStaffCode(dto.role, admin.clinicId);
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.save(
      this.userRepository.create({
        email: dto.email.toLowerCase(),
        passwordHash,
        staffCode,
        clinicId: admin.clinicId,
        fullName: dto.fullName.trim(),
        specialty: dto.specialty?.trim() ?? '',
        phone: dto.phone?.trim() ?? '',
        role: dto.role,
      }),
    );

    return {
      message: 'Staff member registered successfully',
      statusCode: 201,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        staffCode: user.staffCode,
        fullName: user.fullName,
      },
    };
  }

  async listStaff(admin: JwtPayload, query: PaginationQueryDto) {
    const { page, limit, skip } = normalizePagination(query.page, query.limit);

    const [items, totalItems] = await this.userRepository.findAndCount({
      where: { clinicId: admin.clinicId },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      message: 'Staff list retrieved successfully',
      data: items.map((user) => ({
        id: user.id,
        email: user.email,
        role: user.role,
        staffCode: user.staffCode,
        fullName: user.fullName,
        specialty: user.specialty,
        phone: user.phone,
      })),
      pagination: buildPagination(page, limit, totalItems),
    };
  }

  private async nextStaffCode(role: Role, clinicId: string) {
    const prefix = role === Role.Doctor ? 'DR' : 'NR';
    const users = await this.userRepository.find({
      where: { clinicId, role },
    });

    const maxNum = users.reduce((max, user) => {
      const match = user.staffCode.match(new RegExp(`^${prefix}-(\\d+)$`));
      const num = match ? Number(match[1]) : 0;
      return Math.max(max, num);
    }, 0);

    return `${prefix}-${String(maxNum + 1).padStart(3, '0')}`;
  }
}
