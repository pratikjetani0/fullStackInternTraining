// The idea is simple: take a broken, untyped JS function and fix it with proper TypeScript — no any allowed.
type CartItem = {
  name: string; // what type is a product name?
  price: number; // whole or decimal number?
  quantity: number; // must be a whole number
};

type User = {
  name: string; // person's name
  isPremium: boolean; // true or false flag
};

type OrderSummary = {
  customerName: string;
  itemCount: number;
  total: number;
  isPremium: boolean;
};

function getOrderSummary(
  user: User,
  items: CartItem[],
  discount?: number,
): OrderSummary {
  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const finalTotal = discount ? total - (total * discount) / 100 : total;

  return {
    customerName: user.name,
    itemCount: items.length,
    total: finalTotal,
    isPremium: user.isPremium,
  };
}

const user: User = {
  name: "Pratik",
  isPremium: true,
};

const cartItems: CartItem[] = [
  {
    name: "Laptop",
    price: 50000,
    quantity: 1,
  },
  {
    name: "Mouse",
    price: 1000,
    quantity: 2,
  },
];

const summary = getOrderSummary(user, cartItems, 10);

console.log(summary);
