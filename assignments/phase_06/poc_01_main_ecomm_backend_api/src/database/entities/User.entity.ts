import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../../constants/roles";
import { CartItem } from "./CartItem.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", select: false })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems!: CartItem[];
}
