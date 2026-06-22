import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repositories/products.repository.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductRepository) {}

  // CREATE PRODUCT
  async create(dto: CreateProductDto) {
    return await this.productsRepository.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stock: dto.stock,
      imageUrl: dto.imageUrl,
    });
  }

  //FIND ALL PRODUCT
  async findAll() {
    return await this.productsRepository.findAll();
  }

  //FIND PRODUCT BY ID
  async findById(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  //UPDATE PRODUCT
  async update(id: string, dto: UpdateProductDto) {
    await this.findById(id);

    return await this.productsRepository.update(id, dto);
  }

  //DELETE PRODUCT
  async delete(id: string) {
    await this.findById(id);

    await this.productsRepository.delete(id);

    return {
      message: 'Product deleted successfully',
    };
  }
}
