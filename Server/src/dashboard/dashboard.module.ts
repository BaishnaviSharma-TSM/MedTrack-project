import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity, VisitEntity } from '../database/entities';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity, VisitEntity])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
