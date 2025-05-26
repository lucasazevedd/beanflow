import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCotacoes } from "../../services/quoteService";
import { getClientes } from "../../services/clientService";

import { getNomeClientePorId } from "../../utils/clientes";
import { STATUS } from "../../constants/status";
import { opcoesEtapasCotacao } from "../../constants/etapasCotacoes";

import { Cliente } from "../../types/Cliente";
import { Cotacao } from "../../types/Cotacao";

import RightArrowIcon from "../../assets/icons/right-arrow-icon";
import BotaoNovo from "../botao-novo";

import "../../styles/components/widgets-card.css";

export default function CotacoesCard() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [cotacoesData, clientesData] = await Promise.all([
          getCotacoes(),
          getClientes(),
        ]);

        const emAberto = cotacoesData.filter(
          (cotacao: Cotacao) => cotacao.status === STATUS.EM_ABERTO
        );

        setCotacoes(emAberto);
        setClientes(clientesData);
      } catch (error) {
        console.error("Erro ao carregar cotações ou clientes:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="widget-card">
      <BotaoNovo rota="/cotacoes/novo" texto="NOVO ORÇAMENTO" />

      <ul className="widget-lista">
        {cotacoes.map((cotacao) => (
          <li key={cotacao.id} className="widget-item" onClick={() => navigate(`/cotacoes/editar/${cotacao.id}`)}>
            <div className="widget-linha-lateral"></div>
            <div className="widget-conteudo">
              <span className="widget-cliente">
                {getNomeClientePorId(clientes, cotacao.cliente_id)}
              </span>
              <span className="widget-etapa">{opcoesEtapasCotacao.find(opcao => opcao.value === cotacao.etapa)?.label || cotacao.etapa}</span>
            </div>
          </li>
        ))}
      </ul>

      <button className="widget-button" onClick={() => navigate("/cotacoes")}>
        <span>VER TODAS AS COTAÇÕES</span>
        <RightArrowIcon />
      </button>
    </div>
  );
}
