import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type SignupErrors, type SignupFormData, type User } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";

const SignupPage = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<SignupErrors>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [users, setUsers] = useLocalStorage<User[]>(STORAGE_KEYS.USERS, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: SignupErrors = {
      username: "",
      email: "",
      password: "",
    };
    let isValid = true;
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Minimum 3 characters required";
      isValid = false;
    }

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

    const existingUser = users.find((user) => user.email === formData.email);

    if (existingUser) {
      setErrors((prev) => ({ ...prev, email: "Email already exists" }));
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    setUsers([...users, newUser]);

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--card)] rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-[var(--accent)] text-center mb-2">
          Signup
        </h1>

        <p className="text-[var(--muted)] text-center mb-8">
          Create your TypeRush account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          {errors.username && (
            <p className="text-[var(--error)] text-sm">{errors.username}</p>
          )}
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
            Create Account
          </button>
        </form>

        <p className="text-center text-[var(--muted)] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--accent)] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
