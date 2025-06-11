import api from "./api";
import { Cliente } from "../types/Cliente";

// GET - Listar todos os clientes
export async function getClientes(): Promise<Cliente[]> {
  const response = await api.get("/clientes");
  return response.data;
}

// GET - Buscar cliente por ID
export async function getClientePorId(id: number): Promise<Cliente> {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
}

// POST - Cadastrar novo cliente
export async function cadastrarCliente(cliente: Omit<Cliente, "id">) {
  const response = await api.post("/clientes", cliente);
  return response.data;
}

// PUT - Atualizar cliente
export async function updateCliente(id: number, cliente: Partial<Cliente>) {
  const response = await api.put(`/clientes/${id}`, cliente);
  return response.data;
}

// DELETE - Excluir cliente
export async function deleteCliente(id: number) {
  const response = await api.delete(`/clientes/${id}`);
  return response.data;
}