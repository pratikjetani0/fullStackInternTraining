import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


import { useAuthStore } from "../store/auth.store";
import { logout } from "../api/auth.api";

export const useLogout = () => {
  const navigate = useNavigate();

  const storeLogout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      storeLogout();

      navigate("/login");
    },
  });
};
