import {
  Body,
  Controller,
  Get,
  Param,
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
import { CreateVisitDto } from './dto/visit.dto';
import { VisitsService } from './visits.service';

@ApiTags('visits')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Doctor, Role.Nurse)
@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post('visits')
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateVisitDto) {
    return this.visitsService.create(user, dto);
  }

  @Get('visits/records')
  findRecords(@CurrentUser() user: JwtPayload, @Query() query: PaginationQueryDto) {
    return this.visitsService.findRecords(user, query);
  }

  @Get('visits/:id')
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.visitsService.findOne(user, id);
  }

  @Get('patients/:patientId/visits')
  findByPatient(
    @CurrentUser() user: JwtPayload,
    @Param('patientId') patientId: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.visitsService.findByPatient(user, patientId, query);
  }
}
