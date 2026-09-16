import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../../common/enums/gender.enum';
import { ClinicEntity } from './clinic.entity';
import { UserEntity } from './user.entity';
import { VisitEntity } from './visit.entity';

@Entity('patients')
@Unique(['clinicId', 'uniqueId'])
export class PatientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'clinic_id' })
  clinicId: string;

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.patients)
  @JoinColumn({ name: 'clinic_id' })
  clinic: ClinicEntity;

  @Column({ name: 'created_by_user_id' })
  createdByUserId: string;

  @ManyToOne(() => UserEntity, (user) => user.patientsCreated)
  @JoinColumn({ name: 'created_by_user_id' })
  createdBy: UserEntity;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ name: 'contact_number', length: 32 })
  contactNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  address: string;

  @Column({ name: 'unique_id', length: 32 })
  uniqueId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => VisitEntity, (visit) => visit.patient)
  visits: VisitEntity[];
}
