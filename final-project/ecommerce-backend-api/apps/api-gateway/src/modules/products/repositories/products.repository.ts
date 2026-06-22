import { Prisma } from '../../../../../../generated/prisma/client.js';
import { DatabaseService } from '../../../../../../libs/database/src/index.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  //CREATE PRODUCT
  create(data: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data });
  }

  //GET ALL PRODUCTS
  findAll() {
    return this.databaseService.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //GET PRODUCT BY ID
  findById(id: string) {
    return this.databaseService.product.findUnique({
      where: {
        id,
      },
    });
  }

  //UPDATE PRODUCT
  update(id: string, data: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: {
        id,
      },
      data,
    });
  }

  //DELETE PRODUCT
  delete(id: string) {
    return this.databaseService.product.delete({
      where: { id },
    });
  }
}
