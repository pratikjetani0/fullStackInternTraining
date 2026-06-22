import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../../common/enums/role.enum.js';
import { AdminService } from './admin.service.js';
import { GetUsersDto } from './dto/get-users.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getUsers(@Query() query: GetUsersDto) {
    return this.adminService.getUsers(
      Number(query.page ?? 1),
      Number(query.limit ?? 10),
      query.search,
    );
  }

  @Get('orders/summary')
  getOrdersSummary() {
    return this.adminService.getOrdersSummary();
  }

  @Get('products/summary')
  getProdctsSummary() {
    return this.adminService.getProductsSummary();
  }
}
