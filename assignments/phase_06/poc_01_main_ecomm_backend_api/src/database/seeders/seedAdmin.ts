import { AppDataSource } from "../../config/data-source";
import { env } from "../../config/env";
import { UserRole } from "../../constants/roles";
import { hashPassword } from "../../utils/hashPassword";
import { User } from "../entities/User.entity";

export const seedAdmin = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const existingAdmin = await userRepository.findOne({
    where: {
      email: env.seedAdminEmail,
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await hashPassword(env.seedAdminPassword);

  const admin = userRepository.create({
    name: env.seedAdminName,
    email: env.seedAdminEmail,
    password: hashedPassword,
    role: UserRole.ADMIN,
  });

  await userRepository.save(admin);

  console.log("Admin seeded successfully");
};
