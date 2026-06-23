import { useEffect, useState } from "react";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { api } from "../../services/axios";
import { getProfile } from "../../features/auth/api/auth.api";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const refreshResponse = await api.post("/auth/refresh");

        setAccessToken(refreshResponse.data.accessToken);

        const profile = await getProfile();

     

        setUser(profile);
      } catch (error) {
        console.log("AUTH RESTORE FAILED", error);

        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}
