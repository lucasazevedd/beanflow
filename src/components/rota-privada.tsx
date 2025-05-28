import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RotaPrivada({ children }: Props) {
  const logado = localStorage.getItem("logado") === "true";

  if (!logado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
