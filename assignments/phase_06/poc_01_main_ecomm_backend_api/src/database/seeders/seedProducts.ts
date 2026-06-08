import { AppDataSource } from "../../config/data-source";
import { Product } from "../entities/Product.entity";

export const seedProducts = async () => {
  const productRepository = AppDataSource.getRepository(Product);

  const products = [
    {
      name: "iPhone 16",
      description: "Apple smartphone",
      price: 99999,
      stock: 20,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Samsung Galaxy S25",
      description: "Samsung flagship smartphone",
      price: 89999,
      stock: 25,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Google Pixel 9",
      description: "Google smartphone",
      price: 79999,
      stock: 15,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "AirPods Pro",
      description: "Wireless earbuds",
      price: 24999,
      stock: 30,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Sony WH-1000XM5",
      description: "Noise cancelling headphones",
      price: 29999,
      stock: 20,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "MacBook Air M4",
      description: "Apple laptop",
      price: 124999,
      stock: 10,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Dell XPS 15",
      description: "Premium Windows laptop",
      price: 139999,
      stock: 8,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Mechanical Keyboard",
      description: "RGB gaming keyboard",
      price: 4999,
      stock: 50,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Gaming Mouse",
      description: "High precision gaming mouse",
      price: 2999,
      stock: 60,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "T-Shirt",
      description: "Cotton T-Shirt",
      price: 499,
      stock: 100,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Jeans",
      description: "Blue denim jeans",
      price: 1499,
      stock: 80,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Sneakers",
      description: "Comfortable casual shoes",
      price: 2999,
      stock: 40,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Smart Watch",
      description: "Fitness tracking smartwatch",
      price: 9999,
      stock: 25,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable speaker",
      price: 3999,
      stock: 35,
      imageUrl: "",
      isActive: true,
    },
    {
      name: "Power Bank",
      description: "20000mAh power bank",
      price: 1999,
      stock: 45,
      imageUrl: "",
      isActive: true,
    },
  ];

  for (const product of products) {
    const existingProduct = await productRepository.findOne({
      where: {
        name: product.name,
      },
    });

    if (existingProduct) {
      continue;
    }

    await productRepository.save(product);
  }

  console.log("Products seeded successfully");
};
