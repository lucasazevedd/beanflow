import { useEffect, useState } from "react";
import RightArrowIcon from "../assets/icons/right-arrow-icon";
import { getBoletos } from "../services/boletoService";
import "../styles/components/boletos-card.css";

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
  return null; // Se não estiver dentro da janela de 14 dias, ignora
};

const BoletosCard = () => {
  const [boletos, setBoletos] = useState<Boleto[]>([]);

  useEffect(() => {
    async function fetchBoletos() {
      try {
        const data = await getBoletos();
        const boletosFiltrados = data.filter((boleto: Boleto) => {
          const status = getStatusBoleto(boleto.vencimento);
          return status !== null;
        });
        setBoletos(boletosFiltrados);
      } catch (error) {
        console.error("Erro ao buscar boletos:", error);
      }
    }

    fetchBoletos();
  }, []);

  return (
    <div className="boletos-card-root">
      <div className="boletos-header">
        <span className="titulo">⏳ BOLETOS PRÓXIMOS AO VENCIMENTO</span>
      </div>

      <ul className="boletos-lista">
        {boletos.map((boleto) => {
          const statusInfo = getStatusBoleto(boleto.vencimento);
          if (!statusInfo) return null;

          const { emoji, status, classe } = statusInfo;

          return (
            <li key={boleto.id} className={`boleto-item ${classe}`}>
              <div className="boleto-info">
                <span className="cliente">{emoji} {boleto.cliente}</span>
                <span className="status">{status}</span>
              </div>
              <span className="valor">{boleto.valor}</span>
            </li>
          );
        })}
      </ul>

      <button className="ver-todas" onClick={() => window.location.href = "/boletos"}>
        <span>➡️ VER TODOS OS BOLETOS</span>
        <RightArrowIcon className="right-arrow-icon"/>
      </button>
    </div>
  );
};

export default BoletosCard;
