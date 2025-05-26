// utils/clientes.ts
import { Cliente } from "../types/Cliente";
import { Cotacao } from "../types/Cotacao";

/**
 * Retorna o nome do cliente com base no ID.
 * @param clientes Lista de clientes.
 * @param clienteId ID do cliente a ser buscado.
 * @returns Nome do cliente ou fallback com o ID.
 */
export function getNomeClientePorId(clientes: Cliente[], clienteId: number): string {
  const cliente = clientes.find((c) => c.id === clienteId);
  return cliente ? cliente.nome : `Cliente ${clienteId}`;
}

export function getNomeClienteViaCotacaoId(
  cotacao_id: number,
  cotacoes: Cotacao[],
  clientes: Cliente[]
): string {
  const cotacao = cotacoes.find(c => c.id === cotacao_id);
  if (!cotacao) return `Cotação ${cotacao_id}`;

  const cliente = clientes.find(c => c.id === cotacao.cliente_id);
  return cliente ? cliente.nome : `Cliente ${cotacao.cliente_id}`;
}