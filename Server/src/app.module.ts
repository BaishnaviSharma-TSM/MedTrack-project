import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { ConditionsModule } from './conditions/conditions.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseSeedModule } from './database/seeds/database-seed.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HealthModule } from './health/health.module';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    DatabaseSeedModule,
    HealthModule,
    AuthModule,
    UsersModule,
    ConditionsModule,
    PatientsModule,
    VisitsModule,
    DashboardModule,
  ],
})
export class AppModule {}
