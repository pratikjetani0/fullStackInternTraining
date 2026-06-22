import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../../../libs/database/src/database.service.js';
import {
  PaymentStatus,
  Prisma,
} from '../../../../../../generated/prisma/client.js';

@Injectable()
export class PaymentRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  //CREATE PAYMENT
  createPayment(orderId: string, amount: Prisma.Decimal) {
    return this.databaseService.payment.create({
      data: {
        orderId,
        amount,
        status: PaymentStatus.PENDING,
      },
    });
  }

  //FIND THE ORDER BY ID
  findByOrderId(orderId: string) {
    return this.databaseService.payment.findUnique({
      where: {
        orderId,
      },
    });
  }

  //UPDATE PAYMET STATUS
  updatePaymentStatus(
    paymentId: string,
    status: PaymentStatus,
    transactionId?: string,
  ) {
    return this.databaseService.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status,
        transactionId,
      },
    });
  }
}
