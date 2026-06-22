import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../../../libs/database/src/index.js';
import {
  OrderStatus,
  Prisma,
} from '../../../../../../generated/prisma/client.js';

@Injectable()
export class OrdersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  //CREATE ORDER
  createOrder(tx: Prisma.TransactionClient, data: Prisma.OrderCreateInput) {
    return tx.order.create({ data });
  }

  //CREATE ORDER ITEMS
  createOrderItems(
    tx: Prisma.TransactionClient,
    data: Prisma.OrderItemCreateManyInput[],
  ) {
    return tx.orderItem.createMany({ data });
  }

  //FIND ORDERS BY USER
  findOrdersByUserId(userId: string) {
    return this.databaseService.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //FIND ORDER BY ID
  findOrderById(id: string) {
    return this.databaseService.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });
  }

  //UPDATE STATUS
  updateStatus(orderId: string, status: OrderStatus) {
    return this.databaseService.order.update({
      where: { id: orderId },
      data: {
        status,
      },
    });
  }

  //GET TRANSACTION CLIENT
  get prisma(): DatabaseService {
    return this.databaseService;
  }
}
