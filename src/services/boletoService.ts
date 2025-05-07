import { API_BASE_URL } from "./api";

export async function getBoletos() {
  const response = await fetch(`${API_BASE_URL}/boletos`);
  if (!response.ok) {
    throw new Error("Erro ao buscar boletos");
  }
  return response.json();
}
