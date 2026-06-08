import { AppDataSource } from "../../config/data-source";
import { User } from "../../database/entities/User.entity";

export const authRepository = AppDataSource.getRepository(User);

// FIND USER BY EMAIL
export const findUserByEmail = async (email: string) => {
  return await authRepository.findOne({
    where: { email },
  });
};

//CREATE USER
export const createUser = async (user: User) => {
  return await authRepository.save(user);
};

//FIND USER FOR LOGIN
export const findUserForLogin = async (email: string) => {
  return await authRepository.findOne({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
    },
  });
};
