import { Module } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { CartController } from './cart.controller.js';
import { ProductsModule } from '../products/products.module.js';
import { CartRepository } from './repositories/cart.repository.js';

@Module({
  imports: [ProductsModule],
  providers: [CartService, CartRepository],
  controllers: [CartController],
  exports: [CartService, CartRepository],
})
export class CartModule {}
