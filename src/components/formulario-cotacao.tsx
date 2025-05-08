// components/formulario-cotacao.tsx
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";

interface Cotacao {
  id: number;
  cliente_id: number;
  valor_total: number;
  observacoes: string;
  status: string;
  etapa: string;
  data_criacao: string;
}

interface Cliente {
  id: number;
  nome: string;
}

interface FormularioCotacaoProps {
  cotacaoId: number;
  etapaAtual: string;
  onEtapaAtualizar: (etapa: string) => void;
}

export default function FormularioCotacao({
  cotacaoId,
  etapaAtual,
  onEtapaAtualizar,
}: FormularioCotacaoProps) {
  const [cotacao, setCotacao] = useState<Cotacao | null>(null);
  const [clienteNome, setClienteNome] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const cotacaoRes = await fetch(`${API_BASE_URL}/cotacoes/${cotacaoId}`);
        const cotacaoData: Cotacao = await cotacaoRes.json();
        setCotacao(cotacaoData);
        onEtapaAtualizar(cotacaoData.etapa);

        const clienteRes = await fetch(`${API_BASE_URL}/clientes/${cotacaoData.cliente_id}`);
        const clienteData: Cliente = await clienteRes.json();
        setClienteNome(clienteData.nome);
      } catch (error) {
        console.error("Erro ao buscar dados da cotação:", error);
      }
    }

    fetchData();
  }, [cotacaoId]);

  async function handleSalvar() {
    try {
      await fetch(`${API_BASE_URL}/cotacoes/${cotacaoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observacoes: cotacao?.observacoes,
          valor_total: cotacao?.valor_total,
          etapa: cotacao?.etapa,
        }),
      });
    } catch (error) {
      console.error("Erro ao salvar cotação:", error);
    }
  }

  return (
    <div className="formulario-cotacao-card">
      <h2>PEDIDO Nº {cotacao?.id}</h2>

      <div className="linha-info">
        <span><strong>Cliente:</strong> {clienteNome}</span>
        <span><strong>Data:</strong> {cotacao?.data_criacao}</span>
      </div>

      <div className="linha-info">
        <span><strong>Valor:</strong> R$ {cotacao?.valor_total.toLocaleString("pt-BR")}</span>
        <span><strong>Status:</strong> {cotacao?.status}</span>
      </div>

      <div className="grupo">
        <label>Observações:</label>
        <textarea
          value={cotacao?.observacoes || ""}
          onChange={(e) =>
            setCotacao((prev) => prev ? { ...prev, observacoes: e.target.value } : null)
          }
        />
      </div>

      <button onClick={handleSalvar}>Salvar</button>
    </div>
  );
}
