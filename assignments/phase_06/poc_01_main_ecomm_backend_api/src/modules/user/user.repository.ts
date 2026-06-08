import { AppDataSource } from "../../config/data-source";
import { User } from "../../database/entities/User.entity";

export const userRepository = AppDataSource.getRepository(User);

//CREATE USER REPO
export const createUserRepo = async (user: User) => {
  return await userRepository.save(user);
};

// FIND ALL USERS
export const findAllUsers = async () => {
  return await userRepository.find();
};

//FIND USER BY ID
export const findUserById = async (id: string) => {
  return await userRepository.findOne({
    where: { id },
  });
};

// FIND USER BY EMAIL
export const findUserByEmail = async (email: string) => {
  return await userRepository.findOne({
    where: { email },
  });
};

//UPDATE USER
export const updateUserRepo = async (user: User) => {
  return await userRepository.save(user);
};

// DELETE USER
export const deleteUserRepo = async (user: User) => {
  return await userRepository.remove(user);
};
