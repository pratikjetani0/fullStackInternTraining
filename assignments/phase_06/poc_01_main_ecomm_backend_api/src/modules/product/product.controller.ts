import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductService,
  updateProductService,
} from "./product.service";

//GET PRODUCT
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductService();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//GET PRODUCT BY ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await getProductByIdService(req.params.id as string);

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//CREATE PRODUCT (ADMIN ONLY)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req.body);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

//UPDATE PRODUCT (ADMIN ONLY)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await updateProductService(
      req.params.id as string,
      req.body,
    );

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE PRODUCT (ADMIN ONLY)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await deleteProductService(req.params.id as string);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
