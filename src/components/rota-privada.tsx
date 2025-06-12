import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RotaPrivada({ children }: Props) {
  const token = sessionStorage.getItem("token"); // ⬅️ agora usa sessionStorage

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}