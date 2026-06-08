import { UserRole } from "../../constants/roles";
import { comparePassword } from "../../utils/comparePassword";
import { generateToken } from "../../utils/generateToken";
import { hashPassword } from "../../utils/hashPassword";
import {
  authRepository,
  createUser,
  findUserByEmail,
  findUserForLogin,
} from "./auth.repository";
import { LoginDto, RegisterDto } from "./auth.schema";

//REGISTER SERVICE
export const registerService = async (payload: RegisterDto) => {
  const existingUser = await findUserByEmail(payload.email);

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await hashPassword(payload.password);

  const user = authRepository.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: UserRole.USER,
  });

  return createUser(user);
};

//LOGIN SERVICE
export const loginService = async (payload: LoginDto) => {
  const user = await findUserForLogin(payload.email);

  if (!user) {
    throw new Error("Invalid email credentials");
  }

  const isPasswordValid = await comparePassword(
    payload.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid password credentials");
  }

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
