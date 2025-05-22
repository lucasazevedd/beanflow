// utils/date.ts

export interface StatusBoleto {
  emoji: string;
  texto: string;
  classe: string;
}

/**
 * Calcula o status visual e semântico de um boleto com base na data de vencimento.
 * @param vencimento Data no formato YYYY-MM-DD.
 * @returns Informações de status (emoji, texto, classe) ou null se fora da janela.
 */

export function getStatusBoleto(vencimento: string): StatusBoleto | null {
  const hoje = new Date();
  const dataVencimento = new Date(vencimento);
  const diff = Math.ceil((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  if (diff < 0) return { emoji: "🔴", texto: "Vencido", classe: "vencido" };
  if (diff === 0) return { emoji: "🔴", texto: "Vence hoje", classe: "vermelho" };
  if (diff <= 3) return { emoji: "🟠", texto: `Vence em ${diff} dias`, classe: "laranja" };
  if (diff <= 7) return { emoji: "🟡", texto: `Vence em ${diff} dias`, classe: "amarelo" };
  if (diff <= 14) return { emoji: "🟢", texto: `Vence em ${diff} dias`, classe: "verde" };

  return null;
}

export function calcularDataVencimento(base: string, dias: number): string {
  const data = new Date(base);
  data.setDate(data.getDate() + dias);
  return data.toISOString().split("T")[0];
}

export function calcularDiasParaVencimento(dataInicial: string, dataFinal: string): number {
  const inicio = new Date(dataInicial);
  const fim = new Date(dataFinal);
  const diff = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}
