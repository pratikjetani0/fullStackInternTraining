import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product.entity";
import { User } from "./User.entity";

@Entity("cart_items")
@Unique(["user", "product"])
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.cartItems, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: "CASCADE",
  })
  product!: Product;

  @Column({ type: "integer", default: 1 })
  quantity!: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
