import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('vital_normal_ranges')
export class VitalNormalRangeEntity {
  @PrimaryColumn({ name: 'vital_key', length: 64 })
  vitalKey: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  min: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  max: number;

  @Column({ length: 32 })
  unit: string;
}
