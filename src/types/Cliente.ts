export interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  razaoSocial?: string;
  email?: string;
  telefone?: string;
}
