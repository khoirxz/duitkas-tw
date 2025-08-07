// protected-router.tsx
import React from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/useAuth";

export const ProtectedRouter = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    navigate("/");
  }

  return <>{children}</>;
};
