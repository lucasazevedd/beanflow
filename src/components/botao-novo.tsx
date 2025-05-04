import { useNavigate } from "react-router-dom";
import AddNewIcon from "../assets/icons/add-new-icon";
import "../styles/components/botao-novo.css";

interface BotaoNovoProps {
  rota: string;
  texto: string;
}

export default function BotaoNovo({ rota, texto }: BotaoNovoProps) {
  const navigate = useNavigate();

  return (
    <button className="botao-novo" onClick={() => navigate(rota)}>
      <AddNewIcon className="icone-novo" />
      {texto}
    </button>
  );
}
