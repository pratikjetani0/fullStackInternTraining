import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository.js';
import { ProductRepository } from '../products/repositories/products.repository.js';
import { AddCartItemDto } from './dto/add-cart-item.dto.js';
import { UpdateCartItemDto } from './dto/update-cart-item.dto.js';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productsRepository: ProductRepository,
  ) {}

  //ADD CART ITEM
  async addItem(userId: string, dto: AddCartItemDto) {
    const product = await this.productsRepository.findById(dto.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart) {
      await this.cartRepository.createCart(userId);

      cart = await this.cartRepository.findCartByUserId(userId);
    }

    if (!cart) {
      throw new NotFoundException('Cart creation failed');
    }

    const existingItem = await this.cartRepository.findCartItem(
      cart.id,
      dto.productId,
    );

    if (existingItem) {
      return this.cartRepository.updateCartItem(
        existingItem.id,
        existingItem.quantity + dto.quantity,
      );
    }

    return this.cartRepository.createCartItem(
      cart.id,
      dto.productId,
      dto.quantity,
    );
  }

  //GET CART
  async getCart(userId: string) {
    const cart = await this.cartRepository.findCartByUserId(userId);

    return cart ?? { items: [] };
  }

  //UPDATE CART ITEM
  async updateItem(userId: string, productId: string, dto: UpdateCartItemDto) {
    const cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = await this.cartRepository.findCartItem(cart.id, productId);

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    return this.cartRepository.updateCartItem(item.id, dto.quantity);
  }

  //REMOVE CART ITEM
  async removeItem(userId: string, productId: string) {
    const cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = await this.cartRepository.findCartItem(cart.id, productId);

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.removeCartItem(item.id);

    return {
      message: 'Item removed from cart successfully',
    };
  }

  //CLEAR CART
  async clearCart(userId: string) {
    const cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.cartRepository.clearCart(cart.id);

    return {
      message: 'Cart cleared successfully',
    };
  }
}
