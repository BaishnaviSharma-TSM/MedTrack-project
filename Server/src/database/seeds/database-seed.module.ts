import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClinicEntity,
  ConditionEntity,
  ConditionFieldEntity,
  PatientEntity,
  UserEntity,
  VisitEntity,
  VitalNormalRangeEntity,
} from '../entities';
import { DatabaseSeedService } from './database-seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClinicEntity,
      UserEntity,
      PatientEntity,
      VisitEntity,
      ConditionEntity,
      ConditionFieldEntity,
      VitalNormalRangeEntity,
    ]),
  ],
  providers: [DatabaseSeedService],
})
export class DatabaseSeedModule {}
