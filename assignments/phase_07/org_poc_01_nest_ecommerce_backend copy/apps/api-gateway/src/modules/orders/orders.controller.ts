import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { OrdersService } from './orders.service.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../../common/enums/role.enum.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  //CREATE ORDER
  @Post()
  createOrder(@CurrentUser('sub') userId: string) {
    return this.orderService.createOrder(userId);
  }

  //MY ORDERS
  @Get()
  getOrders(@CurrentUser('sub') userId: string) {
    return this.orderService.getOrders(userId);
  }

  //ORDER DETILS BY ID
  @Get(':id')
  getOrderById(
    @CurrentUser('sub') userId: string,
    @Param('id') orderId: string,
  ) {
    return this.orderService.getOrderById(userId, orderId);
  }

  //ADMIN ONLY FOR STATUS UPDATE
  @Patch(':id/status')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateStatus(
    @Param('id') orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(orderId, dto.status);
  }
}
