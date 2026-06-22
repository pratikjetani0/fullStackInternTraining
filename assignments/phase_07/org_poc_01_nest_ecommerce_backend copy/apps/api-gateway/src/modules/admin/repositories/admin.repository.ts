import { OrderStatus } from '../../../../../../generated/prisma/enums.js';
import { DatabaseService } from '../../../../../../libs/database/src/index.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  //! USERS
  // FIND USERS
  findUsers(skip: number, take: number, search?: string) {
    return this.databaseService.user.findMany({
      skip,
      take,
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : undefined,

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  // COUNT USERS
  countUsers(search?: string) {
    return this.databaseService.user.count({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : undefined,
    });
  }

  //! ORDERS
  // TOTAL ORDERS
  countOrders() {
    return this.databaseService.order.count();
  }

  // TOTAL REVENUE
  totalRevenue() {
    return this.databaseService.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });
  }

  //ORDERS BY STATUS
  countOrdersByStatus(status: string) {
    return this.databaseService.order.count({
      where: {
        status: status as OrderStatus,
      },
    });
  }

  //! PRODUCTS
  // COUNT PRODUCTS
  countProducts() {
    return this.databaseService.product.count();
  }

  //COUNT OUT OF STOCK PRODUCTS
  countOutOfStockProducts() {
    return this.databaseService.product.count({
      where: {
        stock: 0,
      },
    });
  }
}
