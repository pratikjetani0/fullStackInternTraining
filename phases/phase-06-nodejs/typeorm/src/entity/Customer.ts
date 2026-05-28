import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({
  schema: "test2",
  name: "customers",
})
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  full_name!: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 15,
  })
  phone!: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  created_at!: Date;
}
