import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FieldType } from '../../common/enums/field-type.enum';
import { VisitEntity } from './visit.entity';

@Entity('conditions')
export class ConditionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 64 })
  slug: string;

  @Column({ length: 128 })
  label: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => ConditionFieldEntity, (field) => field.condition, {
    eager: true,
  })
  fields: ConditionFieldEntity[];

  @OneToMany(() => VisitEntity, (visit) => visit.condition)
  visits: VisitEntity[];
}

@Entity('condition_fields')
export class ConditionFieldEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'condition_id' })
  conditionId: string;

  @ManyToOne(() => ConditionEntity, (condition) => condition.fields, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'condition_id' })
  condition: ConditionEntity;

  @Column({ length: 64 })
  key: string;

  @Column({ length: 128 })
  label: string;

  @Column({ name: 'field_type', type: 'enum', enum: FieldType })
  fieldType: FieldType;

  @Column({ length: 32, nullable: true })
  unit?: string;

  @Column({ length: 255, nullable: true })
  placeholder?: string;

  @Column({ name: 'is_required', default: true })
  isRequired: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;
}
