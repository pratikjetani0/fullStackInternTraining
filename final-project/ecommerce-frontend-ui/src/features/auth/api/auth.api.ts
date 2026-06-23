import { api } from "../../../services/axios";
import type { LoginDto } from "../types/login.type";
import type { RegisterDto } from "../types/register.type";

export const login = async (data: LoginDto) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const register = async (data: RegisterDto) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const refresh = async () => {
  const response = await api.post("/auth/refresh");

  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};