export interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  razao_social?: string;
  email?: string;
  telefone?: string;
}
