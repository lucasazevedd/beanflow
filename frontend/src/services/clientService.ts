import { API_BASE_URL } from "./api";

export async function getClientes() {
  const response = await fetch(`${API_BASE_URL}/clientes`);
  if (!response.ok) {
    throw new Error("Erro ao buscar clientes");
  }
  return response.json();
}

export async function cadastrarCliente(cliente: any) {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });
  
    if (!response.ok) {
      throw new Error("Erro ao cadastrar cliente");
    }
  
    return response.json();
  }
  