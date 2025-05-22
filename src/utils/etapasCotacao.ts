// src/utils/etapasCotacao.ts

export interface EtapaCotacao {
  nome: string;
  ordem: number;
}

export const etapasCotacao: EtapaCotacao[] = [
  { nome: "REALIZAR ORÇAMENTO", ordem: 1 },
  { nome: "AJUSTAR PREÇO", ordem: 2 },
  { nome: "ENVIAR COTAÇÃO", ordem: 3 },
  { nome: "APROVAÇÃO DO ORÇAMENTO", ordem: 4 },
  { nome: "FATURAR PEDIDO", ordem: 5 },
  { nome: "PAGAMENTO", ordem: 6 },
  { nome: "ENTREGA DO MATERIAL", ordem: 7 },
];

// Lista apenas os nomes, útil para selects
export const nomesEtapasCotacao = etapasCotacao.map((etapa) => etapa.nome);

// Função utilitária para obter o número da ordem de uma etapa
export function getOrdemEtapa(nome: string): number | null {
  const etapa = etapasCotacao.find((e) => e.nome === nome);
  return etapa ? etapa.ordem : null;
}
