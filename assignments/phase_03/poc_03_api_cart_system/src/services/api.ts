import type { Product } from "../types/index.js";
import { Toast } from "../utils/Toast.js";

const API_URL = "https://fakestoreapi.com/products";

const toast = new Toast()

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response: Response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch product, status: ${response.status}`);
    }

    const data: Product[] = await response.json();

    return data;
    
  } catch (error) {
    if (error instanceof Error) {
      toast.show(error.message, "error");
    }
   
    return [];
  }
}
