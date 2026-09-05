import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities';
import { ProfileService, StaffRegistrationService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [ProfileService, StaffRegistrationService],
  exports: [ProfileService],
})
export class UsersModule {}
