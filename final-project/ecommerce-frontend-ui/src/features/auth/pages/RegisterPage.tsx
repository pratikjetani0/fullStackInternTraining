import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";

import { useRegister } from "../hooks/useRegister";

export default function RegisterPage() {
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log("Register Success:", response);

        reset();
      },

      onError: (error) => {
        console.error("Register Error:", error);
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full rounded-md bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {isPending ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
