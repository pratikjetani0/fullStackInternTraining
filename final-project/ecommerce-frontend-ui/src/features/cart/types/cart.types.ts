export interface CartItem {
  id: string;
  quantity: number;

  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
  };
}

export interface Cart {
  id?: string;
  items: CartItem[];
}
