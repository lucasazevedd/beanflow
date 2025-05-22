// types/Boleto.ts

export interface Boleto {
  id: number;
  cliente: string;
  valor: string;
  vencimento: string;
  pago: boolean;
}
