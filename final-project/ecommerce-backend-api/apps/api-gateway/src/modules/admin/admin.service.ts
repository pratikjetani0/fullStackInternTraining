import { Injectable } from '@nestjs/common';
import { AdminRepository } from './repositories/admin.repository.js';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  //GET USER
  async getUsers(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.adminRepository.findUsers(skip, limit, search),
      this.adminRepository.countUsers(search),
    ]);

    return { users, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  //GET ORDERS SUMMERY
  async getOrdersSummary() {
    const [totalOrders, revenue, pending, paid, shipped, deleiverd, cancelled] =
      await Promise.all([
        this.adminRepository.countOrders(),
        this.adminRepository.totalRevenue(),

        this.adminRepository.countOrdersByStatus('PENDING'),
        this.adminRepository.countOrdersByStatus('PAID'),
        this.adminRepository.countOrdersByStatus('SHIPPED'),
        this.adminRepository.countOrdersByStatus('DELIVERED'),
        this.adminRepository.countOrdersByStatus('CANCELLED'),
      ]);
    return {
      totalOrders,
      totalRevenue: revenue._sum.totalAmount ?? 0,
      pendingOrders: pending,
      paidOrders: paid,
      shippedOrders: shipped,
      deleiverdOrders: deleiverd,
      cancelledOrders: cancelled,
    };
  }

  //GET PRODUCT SUMMERY
  async getProductsSummary() {
    const [totalProducts, outOfStockProducts] = await Promise.all([
      this.adminRepository.countProducts(),
      this.adminRepository.countOutOfStockProducts(),
    ]);

    return {
      totalProducts,
      outOfStockProducts,
    };
  }
}
