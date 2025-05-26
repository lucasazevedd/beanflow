import { API_BASE_URL } from "./api";
import { Cliente } from "../types/Cliente";

// GET - Listar todos os clientes
export async function getClientes(): Promise<Cliente[]> {
  const response = await fetch(`${API_BASE_URL}/clientes`);
  if (!response.ok) {
    throw new Error("Erro ao buscar clientes");
  }
  return response.json();
}

// GET - Buscar cliente por ID
export async function getClientePorId(id: number): Promise<Cliente> {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar cliente por ID");
  }
  return response.json();
}

// POST - Cadastrar novo cliente
export async function cadastrarCliente(cliente: Omit<Cliente, "id">) {
  const response = await fetch(`${API_BASE_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar cliente");
  }

  return response.json();
}

// PUT - Atualizar cliente
export async function updateCliente(id: number, cliente: Partial<Cliente>) {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar cliente");
  }

  return response.json();
}

// DELETE - Excluir cliente
export async function deleteCliente(id: number) {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir cliente");
  }

  return response.json();
}
