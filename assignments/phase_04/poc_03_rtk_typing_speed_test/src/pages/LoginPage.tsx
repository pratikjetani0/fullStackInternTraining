import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginErrors, LoginFormData, User } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/slices/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [users] = useLocalStorage<User[]>(STORAGE_KEYS.USERS, []);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {
      email: "",
      password: "",
    };
    let isValid = true;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const matchedUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );

    if (!matchedUser) {
      setErrors({
        email: "",
        password: "Invalid email or password",
      });
      return;
    }

    dispatch(login(matchedUser));

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--card)] rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-[var(--accent)] text-center mb-2">
          Login
        </h1>

        <p className="text-[var(--muted)] text-center mb-8">
          Welcome back to TypeRush
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          {errors.email && (
            <p className="text-[var(--error)] text-sm">{errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          {errors.password && (
            <p className="text-[var(--error)] text-sm">{errors.password}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[var(--btn)] text-[var(--btn-text)] py-3 rounded-lg font-semibold hover:bg-[var(--btn-h)] transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-[var(--muted)] mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[var(--accent)] hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
