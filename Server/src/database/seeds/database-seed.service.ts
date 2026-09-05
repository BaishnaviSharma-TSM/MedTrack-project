import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { FieldType } from '../../common/enums/field-type.enum';
import { Role } from '../../common/enums/role.enum';
import { createLogger } from '../../common/logger/app.logger';
import {
  ClinicEntity,
  ConditionEntity,
  ConditionFieldEntity,
  UserEntity,
  VitalNormalRangeEntity,
} from '../entities';

const CONDITIONS = [
  {
    slug: 'fever',
    label: 'Fever',
    fields: [
      { key: 'temperature', label: 'Temperature', fieldType: FieldType.Number, unit: '°F' },
      { key: 'spo2', label: 'Oxygen Saturation', fieldType: FieldType.Number, unit: '%' },
      { key: 'pulse', label: 'Pulse Rate', fieldType: FieldType.Number, unit: 'bpm' },
      { key: 'bloodPressure', label: 'Blood Pressure', fieldType: FieldType.Text, unit: 'mmHg' },
      { key: 'duration', label: 'Duration of Fever', fieldType: FieldType.Number, unit: 'days' },
      { key: 'chills', label: 'Chills or Sweating', fieldType: FieldType.Boolean },
    ],
  },
  {
    slug: 'hypertension',
    label: 'Hypertension',
    fields: [
      { key: 'systolic', label: 'Systolic BP', fieldType: FieldType.Number, unit: 'mmHg' },
      { key: 'diastolic', label: 'Diastolic BP', fieldType: FieldType.Number, unit: 'mmHg' },
      { key: 'pulse', label: 'Pulse Rate', fieldType: FieldType.Number, unit: 'bpm' },
      { key: 'weight', label: 'Weight', fieldType: FieldType.Number, unit: 'kg' },
      { key: 'dizziness', label: 'Dizziness', fieldType: FieldType.Boolean },
      { key: 'medications', label: 'Medications Taken', fieldType: FieldType.Text },
    ],
  },
  {
    slug: 'diabetes',
    label: 'Diabetes Checkup',
    fields: [
      { key: 'fastingGlucose', label: 'Fasting Blood Glucose', fieldType: FieldType.Number, unit: 'mg/dL' },
      { key: 'postMealGlucose', label: 'Post-meal Glucose', fieldType: FieldType.Number, unit: 'mg/dL' },
      { key: 'hba1c', label: 'HbA1c', fieldType: FieldType.Number, unit: '%' },
      { key: 'weight', label: 'Weight', fieldType: FieldType.Number, unit: 'kg' },
      { key: 'numbness', label: 'Numbness/Tingling', fieldType: FieldType.Boolean },
    ],
  },
  {
    slug: 'general',
    label: 'General Checkup',
    fields: [
      { key: 'temperature', label: 'Temperature', fieldType: FieldType.Number, unit: '°F' },
      { key: 'bloodPressure', label: 'Blood Pressure', fieldType: FieldType.Text, unit: 'mmHg' },
      { key: 'pulse', label: 'Pulse Rate', fieldType: FieldType.Number, unit: 'bpm' },
      { key: 'weight', label: 'Weight', fieldType: FieldType.Number, unit: 'kg' },
      { key: 'height', label: 'Height', fieldType: FieldType.Number, unit: 'cm' },
      { key: 'spo2', label: 'Oxygen Saturation', fieldType: FieldType.Number, unit: '%' },
      { key: 'chiefComplaint', label: 'Chief Complaint', fieldType: FieldType.Text },
    ],
  },
];

const NORMAL_RANGES = [
  { vitalKey: 'temperature', min: 97, max: 99, unit: '°F' },
  { vitalKey: 'spo2', min: 95, max: 100, unit: '%' },
  { vitalKey: 'pulse', min: 60, max: 100, unit: 'bpm' },
  { vitalKey: 'systolic', min: 90, max: 120, unit: 'mmHg' },
  { vitalKey: 'diastolic', min: 60, max: 80, unit: 'mmHg' },
  { vitalKey: 'fastingGlucose', min: 70, max: 100, unit: 'mg/dL' },
];

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
  private readonly logger = createLogger('Seed');

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ClinicEntity)
    private readonly clinicRepository: Repository<ClinicEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ConditionEntity)
    private readonly conditionRepository: Repository<ConditionEntity>,
    @InjectRepository(ConditionFieldEntity)
    private readonly conditionFieldRepository: Repository<ConditionFieldEntity>,
    @InjectRepository(VitalNormalRangeEntity)
    private readonly vitalRangeRepository: Repository<VitalNormalRangeEntity>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    this.logger.info('Running database seed…');

    let clinic = await this.clinicRepository.findOne({
      where: { name: 'MedTrack Clinic, Pune' },
    });

    if (!clinic) {
      clinic = await this.clinicRepository.save(
        this.clinicRepository.create({ name: 'MedTrack Clinic, Pune' }),
      );
    }

    const password = this.configService.get<string>('seed.defaultPassword')!;
    const passwordHash = await bcrypt.hash(password, 10);

    const users = [
      {
        email: 'admin@medtrack.com',
        role: Role.Admin,
        staffCode: 'AD-001',
        fullName: 'Admin User',
        specialty: 'Administration',
        phone: '9000000001',
      },
      {
        email: 'doctor@medtrack.com',
        role: Role.Doctor,
        staffCode: 'DR-001',
        fullName: 'Dr. Arjun Mehta',
        specialty: 'General Physician',
        phone: '9876543210',
      },
      {
        email: 'nurse@medtrack.com',
        role: Role.Nurse,
        staffCode: 'NR-001',
        fullName: 'Nurse Priya Sharma',
        specialty: 'Nursing',
        phone: '9123456780',
      },
    ];

    for (const userSeed of users) {
      const existing = await this.userRepository.findOne({
        where: { email: userSeed.email },
      });

      if (!existing) {
        await this.userRepository.save(
          this.userRepository.create({
            ...userSeed,
            clinicId: clinic.id,
            passwordHash,
          }),
        );
      }
    }

    for (const [index, conditionSeed] of CONDITIONS.entries()) {
      let condition = await this.conditionRepository.findOne({
        where: { slug: conditionSeed.slug },
      });

      if (!condition) {
        condition = await this.conditionRepository.save(
          this.conditionRepository.create({
            slug: conditionSeed.slug,
            label: conditionSeed.label,
            sortOrder: index,
            isActive: true,
          }),
        );
      }

      const existingFields = await this.conditionFieldRepository.count({
        where: { conditionId: condition.id },
      });

      if (existingFields === 0) {
        for (const [fieldIndex, field] of conditionSeed.fields.entries()) {
          await this.conditionFieldRepository.save(
            this.conditionFieldRepository.create({
              conditionId: condition.id,
              key: field.key,
              label: field.label,
              fieldType: field.fieldType,
              unit: field.unit,
              isRequired: true,
              sortOrder: fieldIndex,
            }),
          );
        }
      }
    }

    for (const range of NORMAL_RANGES) {
      await this.vitalRangeRepository.upsert(
        {
          vitalKey: range.vitalKey,
          min: range.min,
          max: range.max,
          unit: range.unit,
        },
        {
          conflictPaths: ['vitalKey'],
          skipUpdateIfNoValuesChanged: true,
        },
      );
    }

    this.logger.success(
      `Seed complete — clinic "${clinic.name}", ${users.length} users, ${CONDITIONS.length} conditions`,
    );
  }
}
