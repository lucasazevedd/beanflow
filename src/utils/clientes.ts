// utils/clientes.ts
import { Cliente } from "../types/Cliente";

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
