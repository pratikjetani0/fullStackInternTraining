import axios from "axios";
import type { Product } from "../types/index.js";
import { Toast } from "../utils/Toast.js";

interface ProductsResponse {
  products: Product[];
}

const API_URL = "https://dummyjson.com/products?limit=100";

const toast = new Toast();

// FETCH USED
// export async function fetchProducts(): Promise<Product[]> {
//   try {
//     const response: Response = await fetch(API_URL);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch product, status: ${response.status}`);
//     }

//     const data: Product[] = await response.json();

//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       toast.show(error.message, "error");
//     }

//     return [];
//   }
// }

// AXIOS USED
export async function fetchProducts(): Promise<ProductsResponse> {
  try {
    const response = await axios.get<ProductsResponse>(API_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.show(error.message, "error");
    } else {
      toast.show("Something went wrong", "error");
    }

    return { products: [] };
  }
}
