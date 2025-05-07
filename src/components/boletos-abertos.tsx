import { useEffect, useState } from "react";
import { getBoletos } from "../services/boletoService";
import "../styles/components/boletos-abertos.css";
import "../styles/pages/lista-pages.css";

interface Boleto {
  id: number;
  cliente: string;
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

  useEffect(() => {
    async function fetchBoletos() {
      try {
        const data: Boleto[] = await getBoletos();
        const boletosEmAberto = data.filter((boleto) => boleto.pago === false);
        setBoletos(boletosEmAberto);
      } catch (error) {
        console.error("Erro ao buscar boletos:", error);
      }
    }

    fetchBoletos();
  }, []);

  return (
    <div className="boletos-abertos-container">
      <div className="boletos-abertos-header">
        <span className="boletos-abertos-titulo">BOLETOS ABERTOS</span>
      </div>

      <ul className="boletos-abertos-lista">
        {boletos.map((boleto) => {
          const { emoji, status, classe } = getStatusBoleto(boleto.vencimento);
          return (
            <li key={boleto.id} className={`boletos-abertos-item ${classe}`}>
              <div className="boletos-abertos-info">
                <span className="boletos-abertos-cliente">{emoji} {boleto.cliente}</span>
                <span className="boletos-abertos-status">{status}</span>
              </div>
              <span className="boletos-abertos-valor">{boleto.valor}</span>
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
