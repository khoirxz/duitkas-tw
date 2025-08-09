// protected-router.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/useAuth";

export const ProtectedRouter = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Cek autentikasi tanpa delay agar tidak flicker
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return children;
};
