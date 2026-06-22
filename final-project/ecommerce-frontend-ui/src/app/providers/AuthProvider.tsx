import { useEffect } from "react";
import { refresh } from "../../features/auth/api/auth.api";
import { useAuthStore } from "../../features/auth/store/auth.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await refresh();

        setAccessToken(response.accessToken);
      } catch {
        console.log("No active session");
      }
    };

    restoreSession();
  }, [setAccessToken]);

  return <>{children}</>;
}
