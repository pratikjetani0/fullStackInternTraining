import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { CartModule } from '../cart/cart.module.js';
import { OrdersRepository } from './repositories/orders.repository.js';
import { NotificationsModule } from '../notifications/notifications.module.js';

@Module({
  imports: [CartModule, NotificationsModule],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
