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
  PatientEntity,
  UserEntity,
  VisitEntity,
  VitalNormalRangeEntity,
} from '../entities';
import { DEMO_PATIENTS, DEMO_VISITS } from './demo-clinical.data';

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
  {
    slug: 'asthma',
    label: 'Asthma',
    fields: [
      { key: 'respiratoryRate', label: 'Respiratory Rate', fieldType: FieldType.Number, unit: 'breaths/min' },
      { key: 'spo2', label: 'Oxygen Saturation', fieldType: FieldType.Number, unit: '%' },
      { key: 'peakFlow', label: 'Peak Expiratory Flow', fieldType: FieldType.Number, unit: 'L/min' },
      { key: 'pulse', label: 'Pulse Rate', fieldType: FieldType.Number, unit: 'bpm' },
      { key: 'wheezing', label: 'Wheezing Present', fieldType: FieldType.Boolean },
      { key: 'inhalerUsed', label: 'Inhaler Used Today', fieldType: FieldType.Boolean },
    ],
  },
  {
    slug: 'cardiac',
    label: 'Cardiac Checkup',
    fields: [
      { key: 'systolic', label: 'Systolic BP', fieldType: FieldType.Number, unit: 'mmHg' },
      { key: 'diastolic', label: 'Diastolic BP', fieldType: FieldType.Number, unit: 'mmHg' },
      { key: 'pulse', label: 'Pulse Rate', fieldType: FieldType.Number, unit: 'bpm' },
      { key: 'spo2', label: 'Oxygen Saturation', fieldType: FieldType.Number, unit: '%' },
      { key: 'chestPainScore', label: 'Chest Pain Score', fieldType: FieldType.Number, unit: '0-10' },
      { key: 'shortnessOfBreath', label: 'Shortness of Breath', fieldType: FieldType.Boolean },
      { key: 'ecgNotes', label: 'ECG / Clinical Notes', fieldType: FieldType.Text },
    ],
  },
  {
    slug: 'anemia',
    label: 'Anemia',
    fields: [
      { key: 'hemoglobin', label: 'Hemoglobin', fieldType: FieldType.Number, unit: 'g/dL' },
      { key: 'pulse', label: 'Pulse Rate', fieldType: FieldType.Number, unit: 'bpm' },
      { key: 'bloodPressure', label: 'Blood Pressure', fieldType: FieldType.Text, unit: 'mmHg' },
      { key: 'weight', label: 'Weight', fieldType: FieldType.Number, unit: 'kg' },
      { key: 'pallor', label: 'Pallor Present', fieldType: FieldType.Boolean },
      { key: 'fatigue', label: 'Fatigue Reported', fieldType: FieldType.Boolean },
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
  { vitalKey: 'respiratoryRate', min: 8, max: 60, unit: 'breaths/min' },
  { vitalKey: 'peakFlow', min: 50, max: 800, unit: 'L/min' },
  { vitalKey: 'chestPainScore', min: 0, max: 10, unit: '0-10' },
  { vitalKey: 'hemoglobin', min: 3, max: 20, unit: 'g/dL' },
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
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(VisitEntity)
    private readonly visitRepository: Repository<VisitEntity>,
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

    const { patientsCreated, visitsCreated } = await this.seedDemoClinicalData(clinic.id);
    await this.removeExtraStaff();

    this.logger.success(
      `Seed complete — clinic "${clinic.name}", ${users.length} users, ${CONDITIONS.length} conditions, ${patientsCreated} patients, ${visitsCreated} visits`,
    );
  }

  private async seedDemoClinicalData(clinicId: string) {
    const primaryDoctor = await this.userRepository.findOne({
      where: { email: 'doctor@medtrack.com' },
    });

    if (!primaryDoctor) {
      this.logger.warn('Skipping demo clinical seed — primary doctor not found');
      return { patientsCreated: 0, visitsCreated: 0 };
    }

    const conditions = await this.conditionRepository.find();
    const conditionsBySlug = new Map(conditions.map((condition) => [condition.slug, condition]));

    let patientsCreated = 0;
    const patientsByUniqueId = new Map<string, PatientEntity>();

    for (const patientSeed of DEMO_PATIENTS) {
      let patient = await this.patientRepository.findOne({
        where: { clinicId, uniqueId: patientSeed.uniqueId },
      });

      if (!patient) {
        const createdAt = new Date(patientSeed.createdAt);
        patient = await this.patientRepository.save(
          this.patientRepository.create({
            clinicId,
            createdByUserId: primaryDoctor.id,
            name: patientSeed.name,
            age: patientSeed.age,
            gender: patientSeed.gender,
            contactNumber: patientSeed.contactNumber,
            address: patientSeed.address,
            uniqueId: patientSeed.uniqueId,
            createdAt,
            updatedAt: createdAt,
          }),
        );
        patientsCreated += 1;
      }

      patientsByUniqueId.set(patientSeed.uniqueId, patient);
    }

    let visitsCreated = 0;

    for (const visitSeed of DEMO_VISITS) {
      const patient = patientsByUniqueId.get(visitSeed.patientUniqueId);
      const condition = conditionsBySlug.get(visitSeed.conditionSlug);

      if (!patient || !condition) {
        this.logger.warn(
          `Skipping visit seed ${visitSeed.patientUniqueId}/${visitSeed.conditionSlug} — missing patient or condition`,
        );
        continue;
      }

      const visitDate = new Date(visitSeed.visitDate);
      const existing = await this.visitRepository
        .createQueryBuilder('visit')
        .where('visit.patient_id = :patientId', { patientId: patient.id })
        .andWhere('visit.condition_slug = :slug', { slug: visitSeed.conditionSlug })
        .andWhere('visit.visit_date = :visitDate', { visitDate })
        .getOne();

      if (existing) continue;

      await this.visitRepository.save(
        this.visitRepository.create({
          patientId: patient.id,
          clinicId,
          recordedByUserId: primaryDoctor.id,
          conditionId: condition.id,
          conditionSlug: condition.slug,
          vitals: visitSeed.vitals,
          severity: visitSeed.severity,
          notes: visitSeed.notes,
          visitDate,
        }),
      );
      visitsCreated += 1;
    }

    return { patientsCreated, visitsCreated };
  }

  private async removeExtraStaff() {
    const extraEmails = [
      'nurse@medtrack.com',
      'sneha.iyer@medtrack.com',
      'priya.nair@medtrack.com',
      'kavya.rao@medtrack.com',
    ];
    const primaryDoctor = await this.userRepository.findOne({
      where: { email: 'doctor@medtrack.com' },
    });

    for (const email of extraEmails) {
      const extra = await this.userRepository.findOne({ where: { email } });
      if (!extra) continue;

      if (primaryDoctor) {
        await this.visitRepository.update(
          { recordedByUserId: extra.id },
          { recordedByUserId: primaryDoctor.id },
        );
        await this.patientRepository.update(
          { createdByUserId: extra.id },
          { createdByUserId: primaryDoctor.id },
        );
      }

      await this.userRepository.delete(extra.id);
      this.logger.info(`Removed extra staff account ${email}`);
    }
  }
}
