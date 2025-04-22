import { useNavigate } from "react-router-dom";
import AddNewIcon from "../assets/icons/add-new-icon";

import "../styles/add-new-quote.css";

export default function BotaoNovaCotacao() {
  const navigate = useNavigate();

  return (
    <button className="botao-novo-cliente" onClick={() => navigate("/cotacoes/novo")}>
      <AddNewIcon className="add-new-client" />
      NOVO ORÇAMENTO
    </button>
  );
}
