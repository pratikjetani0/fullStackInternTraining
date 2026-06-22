import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../../../libs/database/src/database.service.js';
import { Prisma } from '../../../../../../generated/prisma/client.js';

@Injectable()
export class CartRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  //FIND CART BY USER ID
  findCartByUserId(userId: string) {
    return this.databaseService.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  //CREATE CART
  createCart(userId: string) {
    return this.databaseService.cart.create({
      data: { userId },
    });
  }

  //FIND CART ITEM
  findCartItem(cartId: string, productId: string) {
    return this.databaseService.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
  }

  //CREATE CART ITEM
  createCartItem(cartId: string, productId: string, quantity: number) {
    return this.databaseService.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  }

  //UPDATE CART ITEM
  updateCartItem(id: string, quantity: number) {
    return this.databaseService.cartItem.update({
      where: { id },
      data: {
        quantity,
      },
    });
  }

  //REMOVE CART ITEM
  removeCartItem(id: string) {
    return this.databaseService.cartItem.delete({
      where: { id },
    });
  }

  //CLEAR CART
  clearCart(cartId: string) {
    return this.databaseService.cartItem.deleteMany({
      where: {
        cartId,
      },
    });
  }

  //CLEAR CART WHEN TRNASCATION SUCCESS
  clearCartTx(tx: Prisma.TransactionClient, cartId: string) {
    return tx.cartItem.deleteMany({
      where: {
        cartId,
      },
    });
  }
}
