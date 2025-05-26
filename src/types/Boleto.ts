// types/Boleto.ts

export interface Boleto {
  id: number;
  cliente_id: number;
  valor: string;
  vencimento: string;
  pago: boolean;
  cotacao_id: number;
}
