// components/etapas-cotacao.tsx
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";

interface Etapa {
  nome: string;
  concluida: boolean;
  ordem: number;
}

interface EtapasCotacaoProps {
  cotacaoId: number;
  etapaAtual: string;
  onEtapaChange: (etapa: string) => void;
}

const etapasFixas: Etapa[] = [
  { nome: "REALIZAR ORÇAMENTO", concluida: false, ordem: 1 },
  { nome: "AJUSTAR PREÇO", concluida: false, ordem: 2 },
  { nome: "ENVIAR COTAÇÃO", concluida: false, ordem: 3 },
  { nome: "APROVAÇÃO DO ORÇAMENTO", concluida: false, ordem: 4 },
  { nome: "FATURAR PEDIDO", concluida: false, ordem: 5 },
  { nome: "PAGAMENTO", concluida: false, ordem: 6 },
  { nome: "ENTREGA DO MATERIAL", concluida: false, ordem: 7 },
];

export default function EtapasCotacao({ cotacaoId, etapaAtual, onEtapaChange }: EtapasCotacaoProps) {
  const [etapas, setEtapas] = useState<Etapa[]>([]);

  useEffect(() => {
    const indexAtual = etapasFixas.findIndex((e) => e.nome === etapaAtual);
    const atualizadas = etapasFixas.map((etapa, i) => ({
      ...etapa,
      concluida: i <= indexAtual,
    }));
    setEtapas(atualizadas);
  }, [etapaAtual]);

  async function handleEtapaClick(index: number) {
    const etapaSelecionada = etapas[index];
    if (etapaSelecionada.concluida || (index > 0 && !etapas[index - 1].concluida)) return;

    try {
      await fetch(`${API_BASE_URL}/etapas-cotacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cotacao_id: cotacaoId, etapa: etapaSelecionada.nome }),
      });

      const atualizadas = etapas.map((etapa, i) => ({
        ...etapa,
        concluida: i <= index,
      }));

      setEtapas(atualizadas);
      onEtapaChange(etapaSelecionada.nome);
    } catch (error) {
      console.error("Erro ao atualizar etapa:", error);
    }
  }

  return (
    <div className="etapas-cotacao-card">
      {etapas.map((etapa, i) => (
        <button
          key={i}
          className={`etapa-botao ${etapa.concluida ? "concluida" : ""}`}
          onClick={() => handleEtapaClick(i)}
        >
          <span className="etapa-numero">{etapa.concluida ? "✓" : i + 1}</span>
          <span className="etapa-nome">{etapa.nome}</span>
        </button>
      ))}
    </div>
  );
}
