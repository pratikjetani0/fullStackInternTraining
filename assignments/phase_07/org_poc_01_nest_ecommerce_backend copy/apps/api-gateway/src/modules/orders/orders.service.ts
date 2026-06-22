import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from './repositories/orders.repository.js';
import { CartRepository } from '../cart/repositories/cart.repository.js';
import { OrderStatus } from 'generated/prisma/enums.js';
import { Prisma } from '../../../../../generated/prisma/client.js';
import { NotificationsService } from '../notifications/notifications.service.js';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly cartRepository: CartRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  //CREATE ORDER
  async createOrder(userId: string) {
    const cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const totalAmount = new Prisma.Decimal(
      cart.items.reduce(
        (total, item) => total + Number(item.product.price) * item.quantity,
        0,
      ),
    );
    const createdOrder = await this.ordersRepository.prisma.$transaction(
      async (tx) => {
        const order = await this.ordersRepository.createOrder(tx, {
          user: {
            connect: {
              id: userId,
            },
          },
          totalAmount,
        });

        await this.ordersRepository.createOrderItems(
          tx,
          cart.items.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        );

        await this.cartRepository.clearCartTx(tx, cart.id);

        return order;
      },
    );

    this.notificationsService.sendNotification({
      userId,
      title: 'Order Created',
      message: 'Your order has been placed successfully.',
      type: 'ORDER',
    });

    return createdOrder;
  }

  //GET ORDER
  async getOrders(userId: string) {
    return this.ordersRepository.findOrdersByUserId(userId);
  }

  //GET SINGLE ORDER OF USER
  async getOrderById(userId: string, orderId: string) {
    const order = await this.ordersRepository.findOrderById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new BadRequestException('Order does not belong to user');
    }

    return order;
  }

  //UPDATE STATUS
  async updateStatus(orderId: string, status: OrderStatus) {
    return this.ordersRepository.updateStatus(orderId, status);
  }
}
