import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import {
  ClinicEntity,
  ConditionEntity,
  ConditionFieldEntity,
  PatientEntity,
  RefreshTokenEntity,
  UserEntity,
  VisitEntity,
  VitalNormalRangeEntity,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        ssl: configService.get<boolean>('database.ssl')
          ? { rejectUnauthorized: false }
          : false,
        entities: [
          ClinicEntity,
          UserEntity,
          PatientEntity,
          ConditionEntity,
          ConditionFieldEntity,
          VisitEntity,
          VitalNormalRangeEntity,
          RefreshTokenEntity,
        ],
        synchronize: configService.get<string>('nodeEnv') !== 'production',
        logging: configService.get<boolean>('database.logging') ?? false,
      }),
    }),
  ],
})
export class DatabaseModule {}
