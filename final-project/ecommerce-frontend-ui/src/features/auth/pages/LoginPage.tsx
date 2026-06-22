import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { mutate } = useLogin();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const { register, handleSubmit } = useForm<LoginSchema>({
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <input
        placeholder="Email"
        {...register("email")}
        className="w-full border p-2"
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="w-full border p-2"
      />

      <button type="submit" className="bg-black text-white px-4 py-2">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
