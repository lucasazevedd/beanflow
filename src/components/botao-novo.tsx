import { useNavigate } from "react-router-dom";
import AddNewIcon from "../assets/icons/add-new-icon";
import "../styles/components/botao-novo.css";

interface ButtonProps {
  rota: string;
  texto: string;
}

export default function Button ({ rota, texto }: ButtonProps) {
  const navigate = useNavigate();

  return (
    <button className="botao-novo" onClick={() => navigate(rota)}>
      <AddNewIcon />
      {texto}
    </button>
  );
}
