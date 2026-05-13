import axios from "axios";
import type { Product } from "../types/index.js";
import { Toast } from "../utils/Toast.js";

const API_URL = "https://api.escuelajs.co/api/v1/products";

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
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.show(error.message, "error");
    } else {
      toast.show("Something went wrong", "error");
    }

    return [];
  }
}
