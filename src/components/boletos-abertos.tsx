import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBoletos } from "../services/boletoService";
import { getClientes } from "../services/clientService";
import BotaoNovo from "./botao-novo";
// import RightArrowIcon from "../assets/icons/right-arrow-icon";

import { getStatusBoleto } from "../utils/date";
import { getNomeClientePorId } from "../utils/clientes";

import { Cliente } from "../types/Cliente";
import { Boleto } from "../types/Boleto";

import "../styles/components/widgets-card.css";

export default function BoletosAbertos() {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        const [boletosData, clientesData] = await Promise.all([
          getBoletos(),
          getClientes(),
        ]);

        const boletosEmAberto = boletosData.filter((b: Boleto) => !b.pago);
        setBoletos(boletosEmAberto);
        setClientes(clientesData);
      } catch (error) {
        console.error("Erro ao buscar boletos ou clientes:", error);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="widget-card">
      <BotaoNovo rota="/boletos/novo" texto="NOVO BOLETO" />

      <ul className="widget-lista">
        {boletos.map((boleto) => {
          const status = getStatusBoleto(boleto.vencimento);
          return (
            <li key={boleto.id} className={`widget-item ${status?.classe}`} onClick={() => navigate(`/boletos/editar/${boleto.id}`)}>
              <div className="widget-item-header">
                <span>
                  {status?.emoji} {getNomeClientePorId(clientes, boleto.cliente_id)}
                </span>
                <span className="widget-status">{status?.texto}</span>
              </div>
              <span className="widget-value">
                {Number(boleto.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="widget-footer">
        <span>{boletos.length} boletos em aberto</span>
      </div>
    </div>
  );
}
