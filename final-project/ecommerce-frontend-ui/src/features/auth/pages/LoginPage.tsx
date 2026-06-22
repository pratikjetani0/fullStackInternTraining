import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchema } from "../schemas/login.schema";

import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/auth.store";

export default function LoginPage() {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: (response) => {
        setAccessToken(response.accessToken);

        navigate("/");
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        {/* LEFT SIDE */}
        <div className="hidden flex-1 items-center justify-center bg-black p-12 lg:flex">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white">Cartly</h1>

            <p className="mt-6 text-lg text-slate-300">
              Modern ecommerce platform built with React, NestJS, Prisma and
              PostgreSQL.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Welcome Back</h2>

              <p className="mt-2 text-slate-500">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-black"
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-black"
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:bg-slate-800"
              >
                {isPending ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-black">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
