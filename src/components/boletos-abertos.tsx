import { useEffect, useState } from "react";
import { getBoletos } from "../services/boletoService";
import { getClientes } from "../services/clientService";
import AddNewIcon from "../assets/icons/add-new-icon";
import { useNavigate } from "react-router-dom";
import "../styles/components/boletos-abertos.css";
import "../styles/pages/lista-pages.css";
import "../styles/components/cotacoes-card.css";

interface Cliente {
  id: number;
  nome: string;
}

interface Boleto {
  id: number;
  cliente: number; // <- este campo agora é tratado como cliente_id
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
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchBoletos() {
      try {
        const [boletosData, clientesData]: [Boleto[], Cliente[]] = await Promise.all([
          getBoletos(),
          getClientes(),
        ]);
        
        const boletosEmAberto = boletosData.filter((b) => b.pago === false);
        setBoletos(boletosEmAberto);
        setClientes(clientesData);
      } catch (error) {
        console.error("Erro ao buscar boletos ou clientes:", error);
      }
    }

    fetchBoletos();
  }, []);

  const getNomeCliente = (cliente_id: number) => {
    const cliente = clientes.find((c) => c.id === cliente_id);
    return cliente ? cliente.nome : `Cliente ${cliente_id}`;
  };

  return (
    <div className="boletos-abertos-container">
      <div className="boletos-abertos-header">
      <button className="add-cotacao" onClick={() => navigate("/boletos/novo")}>
        <AddNewIcon className="add-new-icon" />
        NOVO BOLETO
      </button>
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
