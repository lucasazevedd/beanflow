import { useNavigate } from "react-router-dom";
import AddNewIcon from "../assets/icons/add-new-icon";

import "../styles/add-new-client.css";

export default function BotaoNovoCliente() {
  const navigate = useNavigate();

  return (
    <button className="botao-novo-cliente" onClick={() => navigate("/clientes/novo")}>
      <AddNewIcon className="add-new-client" />
      NOVO CLIENTE
    </button>
  );
}
