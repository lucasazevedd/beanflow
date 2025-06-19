export interface Cotacao {
  id: number;
  cliente_id: number;
  etapa: string;
  status: string;
  valor_total: number;
  observacoes?: string;
  data_criacao: string;
  data_finalizacao?: string;
  data_faturamento?: string;
}
