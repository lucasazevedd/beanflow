import RightArrowIcon from "../assets/icons/right-arrow-icon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCotacoes } from "../services/quoteService";
import { getClientes } from "../services/clientService";
import BotaoNovo from "./botao-novo";

import "../styles/components/cotacoes-card.css";

interface Cotacao {
  id: number;
  cliente_id: number;
  etapa: string;
  status: string;
}

interface Cliente {
  id: number;
  nome: string;
}

const CotacoesCard = () => {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [cotacoesData, clientesData] = await Promise.all([
          getCotacoes(),
          getClientes()
        ]);

        setCotacoes(cotacoesData.slice(0, 5)); // mostra no máximo 5
        setClientes(clientesData);
      } catch (error) {
        console.error("Erro ao carregar cotações ou clientes:", error);
      }
    }

    fetchData();
  }, []);

  const getNomeCliente = (cliente_id: number) => {
    const cliente = clientes.find((c) => c.id === cliente_id);
    return cliente ? cliente.nome : `Cliente ${cliente_id}`;
  };

  return (
    <div className="cotacoes-card-container">
      <BotaoNovo rota="/cotacoes/novo" texto="NOVO ORÇAMENTO" />

      <ul>
        {cotacoes.map((item) => (
          <li key={item.id}>
            <div className="linha-lateral"></div>
            <div className="conteudo">
              <span className="cliente">{getNomeCliente(item.cliente_id)}</span>
              <span className="etapas">{item.etapa}</span>
            </div>
          </li>
        ))}
      </ul>

      <button className="ver-todas" onClick={() => navigate("/cotacoes")}>
        <span>➡️ VER TODAS AS COTAÇÕES</span>
        <RightArrowIcon className="right-arrow-icon" />
      </button>
    </div>
  );
};

export default CotacoesCard;
