import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { JwtAuthGuard, RolesGuard } from '../common/guards/auth.guards';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { RegisterStaffDto, UpdateProfileDto } from './dto/user.dto';
import { ProfileService, StaffRegistrationService } from './users.service';

@ApiTags('users')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly staffRegistrationService: StaffRegistrationService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user: JwtPayload) {
    return this.profileService.getProfile(user.sub);
  }

  @Patch('me')
  updateMe(@CurrentUser() user: JwtPayload, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(user.sub, dto);
  }

  @Post()
  @Roles(Role.Admin)
  registerStaff(@CurrentUser() user: JwtPayload, @Body() dto: RegisterStaffDto) {
    return this.staffRegistrationService.registerStaff(user, dto);
  }

  @Get()
  @Roles(Role.Admin)
  listStaff(@CurrentUser() user: JwtPayload, @Query() query: PaginationQueryDto) {
    return this.staffRegistrationService.listStaff(user, query);
  }
}
