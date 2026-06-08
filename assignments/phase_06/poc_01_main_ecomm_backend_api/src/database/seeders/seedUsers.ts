import { AppDataSource } from "../../config/data-source";
import { User } from "../entities/User.entity";
import { UserRole } from "../../constants/roles";
import { hashPassword } from "../../utils/hashPassword";

export const seedUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const password = await hashPassword("user123");

  const users = [
    {
      name: "Rahul",
      email: "rahul@gmail.com",
    },
    {
      name: "Amit",
      email: "amit@gmail.com",
    },
    {
      name: "Neha",
      email: "neha@gmail.com",
    },
    {
      name: "Priya",
      email: "priya@gmail.com",
    },
    {
      name: "Riya",
      email: "riya@gmail.com",
    },
    {
      name: "Karan",
      email: "karan@gmail.com",
    },
    {
      name: "Vivek",
      email: "vivek@gmail.com",
    },
  ];

  for (const user of users) {
    const existingUser = await userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      continue;
    }

    await userRepository.save({
      ...user,
      password,
      role: UserRole.USER,
    });
  }

  console.log("Users seeded successfully");
};
