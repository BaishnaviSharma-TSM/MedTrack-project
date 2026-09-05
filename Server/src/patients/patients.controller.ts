import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { JwtAuthGuard, RolesGuard } from '../common/guards/auth.guards';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { PatientsService } from './patients.service';

@ApiTags('patients')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Doctor, Role.Nurse)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreatePatientDto) {
    return this.patientsService.create(user, dto);
  }

  @Get('records')
  findRecords(@CurrentUser() user: JwtPayload, @Query() query: PaginationQueryDto) {
    return this.patientsService.findRecords(user, query);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload, @Query() query: PaginationQueryDto) {
    return this.patientsService.findAll(user, query);
  }

  @Get(':id')
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.patientsService.findOne(user, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientsService.update(user, id, dto);
  }
}
