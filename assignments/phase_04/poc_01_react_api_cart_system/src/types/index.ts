// Product Interface
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
}

// CartItem Interface
export interface CartItem {
  product: Product;
  quantity: number;
}

// Cart
export interface Cart {
  items: CartItem[];
  total: number;
}
