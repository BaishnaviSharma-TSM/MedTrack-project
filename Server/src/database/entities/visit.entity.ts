import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Severity } from '../../common/enums/severity.enum';
import { ClinicEntity } from './clinic.entity';
import { ConditionEntity } from './condition.entity';
import { PatientEntity } from './patient.entity';
import { UserEntity } from './user.entity';

export interface VitalSignRecord {
  key: string;
  label: string;
  value: string | number | boolean;
  unit?: string;
}

@Entity('visits')
export class VisitEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.visits)
  @JoinColumn({ name: 'patient_id' })
  patient: PatientEntity;

  @Column({ name: 'clinic_id' })
  clinicId: string;

  @ManyToOne(() => ClinicEntity)
  @JoinColumn({ name: 'clinic_id' })
  clinic: ClinicEntity;

  @Column({ name: 'recorded_by_user_id' })
  recordedByUserId: string;

  @ManyToOne(() => UserEntity, (user) => user.visitsRecorded)
  @JoinColumn({ name: 'recorded_by_user_id' })
  recordedBy: UserEntity;

  @Column({ name: 'condition_id' })
  conditionId: string;

  @ManyToOne(() => ConditionEntity, (condition) => condition.visits)
  @JoinColumn({ name: 'condition_id' })
  condition: ConditionEntity;

  @Column({ name: 'condition_slug', length: 64 })
  conditionSlug: string;

  @Column({ type: 'jsonb' })
  vitals: VitalSignRecord[];

  @Column({ type: 'enum', enum: Severity, nullable: true })
  severity?: Severity;

  @Column({ type: 'text', array: true, nullable: true })
  tags?: string[];

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'visit_date', type: 'timestamptz' })
  visitDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
