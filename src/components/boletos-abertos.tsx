import { useEffect, useState } from "react";
import { getBoletos } from "../services/boletoService";
import { getClientes } from "../services/clientService";
import BotaoNovo from "./botao-novo";
import "../styles/components/boletos-abertos.css";
import "../styles/pages/lista-pages.css";

interface Cliente {
  id: number;
  nome: string;
}

interface Boleto {
  id: number;
  cliente: number;
  valor: string;
  vencimento: string;
  pago: boolean;
}

const getStatusBoleto = (vencimento: string) => {
  const hoje = new Date();
  const dataVencimento = new Date(vencimento);
  const diffDias = Math.ceil((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDias < 0) return { emoji: "🔴", status: "Vencido", classe: "vencido" };
  if (diffDias === 0) return { emoji: "🔴", status: "Vence hoje", classe: "vermelho" };
  if (diffDias <= 3) return { emoji: "🟠", status: `Vence em ${diffDias} dias`, classe: "laranja" };
  if (diffDias <= 7) return { emoji: "🟡", status: `Vence em ${diffDias} dias`, classe: "amarelo" };
  if (diffDias <= 14) return { emoji: "🟢", status: `Vence em ${diffDias} dias`, classe: "verde" };
  return { emoji: "⚪️", status: `Vence em ${diffDias} dias`, classe: "branco" };
};

const BoletosAbertos = () => {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    async function fetchBoletos() {
      try {
        const [boletosData, clientesData] = await Promise.all([
          getBoletos(),
          getClientes(),
        ]);
        
        const boletosEmAberto = boletosData.filter((b: Boleto) => b.pago === false);
        setBoletos(boletosEmAberto);
        setClientes(clientesData);
      } catch (error) {
        console.error("Erro ao buscar boletos ou clientes:", error);
      }
    }

    fetchBoletos();
  }, []);

  const getNomeCliente = (cliente_id: number | undefined) => {
    if (!cliente_id) return "Cliente não definido";
    const cliente = clientes.find((c) => c.id === cliente_id);
    return cliente ? cliente.nome : `Cliente ${cliente_id}`;
  };

  return (
    <div className="boletos-abertos-container">
      <div className="boletos-abertos-header">
        <BotaoNovo rota="/boletos/novo" texto="NOVO BOLETO" />
      </div>

      <ul className="boletos-abertos-lista">
        {boletos.map((boleto) => {
          const { emoji, status, classe } = getStatusBoleto(boleto.vencimento);
          return (
            <li key={boleto.id} className={`boletos-abertos-item ${classe}`}>
              <div className="boletos-abertos-info">
                <span className="boletos-abertos-cliente">
                  {emoji} {getNomeCliente(boleto.cliente)}
                </span>
                <span className="boletos-abertos-status">{status}</span>
              </div>
              <span className="boletos-abertos-valor">
                {Number(boleto.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="boletos-abertos-rodape">
        <span>{boletos.length} boletos em aberto</span>
      </div>
    </div>
  );
};

export default BoletosAbertos;
