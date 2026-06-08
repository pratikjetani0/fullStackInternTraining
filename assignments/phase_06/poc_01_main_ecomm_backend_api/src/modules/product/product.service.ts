import {
  createProductRepo,
  deleteProductRepo,
  findAllProducts,
  findProductById,
  productRepository,
  updateProductRepo,
} from "./product.repository";
import { CreateProductDto, UpdateProductDto } from "./product.schema";

//GET ALL PRODUCT SERVICE
export const getProductService = async () => {
  return await findAllProducts();
};

//GET PRODUCT BT ID SERVICE
export const getProductByIdService = async (id: string) => {
  const product = await findProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

//CREATE NEW PRODUCT(ADMIN ONLY)
export const createProductService = async (payload: CreateProductDto) => {
  const product = await productRepository.create(payload);

  return await createProductRepo(product);
};

//UPDATE PRODUCT(ADMIN ONLY)
export const updateProductService = async (
  id: string,
  payload: UpdateProductDto,
) => {
  const product = await findProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  Object.assign(product, payload);

  return await updateProductRepo(product);
};

//DELETE PRODUCT(ADMIN ONLY)
export const deleteProductService = async (id: string) => {
  const product = await findProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await deleteProductRepo(product);
};
