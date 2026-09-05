import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { ClinicEntity } from './clinic.entity';
import { PatientEntity } from './patient.entity';
import { VisitEntity } from './visit.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ name: 'staff_code', length: 32 })
  staffCode: string;

  @Column({ name: 'clinic_id' })
  clinicId: string;

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.users, { eager: true })
  @JoinColumn({ name: 'clinic_id' })
  clinic: ClinicEntity;

  @Column({ name: 'full_name', length: 255 })
  fullName: string;

  @Column({ length: 255, default: '' })
  specialty: string;

  @Column({ length: 32, default: '' })
  phone: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => PatientEntity, (patient) => patient.createdBy)
  patientsCreated: PatientEntity[];

  @OneToMany(() => VisitEntity, (visit) => visit.recordedBy)
  visitsRecorded: VisitEntity[];

  @OneToMany(() => RefreshTokenEntity, (token) => token.user)
  refreshTokens: RefreshTokenEntity[];
}
