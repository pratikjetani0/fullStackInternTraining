import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentRepository } from './repositories/payments.repository.js';
import { NotificationsModule } from '../notifications/notifications.module.js';

@Module({
  imports: [OrdersModule, NotificationsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentRepository],
})
export class PaymentsModule {}
