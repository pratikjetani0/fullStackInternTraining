import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from '../orders/repositories/orders.repository.js';
import { PaymentRepository } from './repositories/payments.repository.js';
import {
  OrderStatus,
  PaymentStatus,
} from '../../../../../generated/prisma/client.js';
import { SimulatePaymentDto } from './dto/simulate-payment.dto.js';
import { NotificationsService } from '../notifications/notifications.service.js';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly paymentsRepository: PaymentRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  //SIMULATE PAYMENT
  async simulatePayment(dto: SimulatePaymentDto) {
    const order = await this.ordersRepository.findOrderById(dto.orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    let payment = await this.paymentsRepository.findByOrderId(dto.orderId);

    if (payment && payment.status === PaymentStatus.SUCCESS) {
      throw new BadRequestException('Order already paid');
    }

    if (!payment) {
      payment = await this.paymentsRepository.createPayment(
        order.id,
        order.totalAmount,
      );
    }

    const success = dto.success ?? true;

    if (!success) {
      await this.paymentsRepository.updatePaymentStatus(
        payment.id,
        PaymentStatus.FAILED,
      );

      return {
        success: false,
        message: 'Payment failed',
      };
    }

    await this.paymentsRepository.updatePaymentStatus(
      payment.id,
      PaymentStatus.SUCCESS,
      `TXN-${Date.now()}`,
    );

    await this.ordersRepository.updateStatus(order.id, OrderStatus.PAID);

    this.notificationsService.sendNotification({
      userId: order.userId,
      title: 'Payment Successful',
      message: 'Your payment was processed successfully.',
      type: 'PAYMENT',
    });

    return {
      success: true,
      message: 'Payment successful',
    };
  }
}
