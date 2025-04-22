import { API_BASE_URL } from "./api";

export async function getCotacoes() {
  const response = await fetch(`${API_BASE_URL}/cotacoes`);

  if (!response.ok) {
    throw new Error("Erro ao buscar cotações");
  }

  return response.json();
}