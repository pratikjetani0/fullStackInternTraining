import { AppDataSource } from "../../config/data-source";
import { Product } from "../../database/entities/Product.entity";

export const productRepository = AppDataSource.getRepository(Product);

//FIND ALL PRODUCTS
export const findAllProducts = async () => {
  return await productRepository.find();
};

//FIND PRODUCT BY ID
export const findProductById = async (id: string) => {
  return await productRepository.findOne({
    where: { id },
  });
};

//CREATE PRODUCT(ADMIN ONLY)
export const createProductRepo = async (product: Product) => {
  return await productRepository.save(product);
};

//UPDATE PRODUCT(ADMIN ONLY)
export const updateProductRepo = async (product: Product) => {
  return await productRepository.save(product);
};

//DELETE PRODUCT(ADMIN ONLY)
export const deleteProductRepo = async (product: Product) => {
  return await productRepository.remove(product);
};
