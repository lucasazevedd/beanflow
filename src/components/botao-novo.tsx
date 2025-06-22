import { useNavigate } from "react-router-dom";
import AddNewIcon from "../assets/icons/add-new-icon";
import "../styles/components/botao-novo.css";

interface ButtonProps {
  rota: string;
  texto: string;
  className?: string; // <- ✅ aceita classe opcional
}

export default function Button({ rota, texto, className }: ButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className={`botao-novo ${className || ""}`} // <- ✅ mescla as classes
      onClick={() => navigate(rota)}
    >
      <AddNewIcon />
      {texto}
    </button>
  );
}