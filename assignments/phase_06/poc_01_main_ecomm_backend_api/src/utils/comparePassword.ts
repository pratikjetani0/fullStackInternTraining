import bcrypt from "bcrypt";

export const comparePassword = async (
  plainPassword: string,
  hashPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashPassword);
};
