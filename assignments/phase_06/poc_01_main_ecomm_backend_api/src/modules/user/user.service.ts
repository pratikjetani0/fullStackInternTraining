import {
  createUserRepo,
  deleteUserRepo,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateUserRepo,
  userRepository,
} from "./user.repository";
import { CreateUserDto, UpdateUserDto } from "./user.schema";

//  CREATE USER SERVICE
export const createUserService = async (payload: CreateUserDto) => {
  const existingUser = await findUserByEmail(payload.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = userRepository.create(payload);

  return createUserRepo(user);
};

//GET USER SERVICE
export const getUsersService = async () => {
  return await findAllUsers();
};

//GET USER BY ID
export const getUserByIdService = async (id: string) => {
  const user = await findUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

//UPDATE THE USER BY ID
export const updateUserService = async (id: string, payload: UpdateUserDto) => {
  const user = await findUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  Object.assign(user, payload);

  return updateUserRepo(user);
};

//DELETE USER BY ID
export const deleteUserService = async (id: string) => {
  const user = await findUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await deleteUserRepo(user);

  return null;
};
