import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClinicEntity,
  ConditionEntity,
  ConditionFieldEntity,
  UserEntity,
  VitalNormalRangeEntity,
} from '../entities';
import { DatabaseSeedService } from './database-seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClinicEntity,
      UserEntity,
      ConditionEntity,
      ConditionFieldEntity,
      VitalNormalRangeEntity,
    ]),
  ],
  providers: [DatabaseSeedService],
})
export class DatabaseSeedModule {}
