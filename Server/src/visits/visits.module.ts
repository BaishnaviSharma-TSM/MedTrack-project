import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConditionEntity,
  PatientEntity,
  VisitEntity,
  VitalNormalRangeEntity,
} from '../database/entities';
import { ConditionResolverService } from './services/condition-resolver.service';
import { SeverityCalculatorService } from './services/severity-calculator.service';
import { VitalsValidatorService } from './services/vitals-validator.service';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VisitEntity,
      PatientEntity,
      ConditionEntity,
      VitalNormalRangeEntity,
    ]),
  ],
  controllers: [VisitsController],
  providers: [
    VisitsService,
    ConditionResolverService,
    VitalsValidatorService,
    SeverityCalculatorService,
  ],
  exports: [VisitsService],
})
export class VisitsModule {}
