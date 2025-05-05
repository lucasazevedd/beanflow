import { API_BASE_URL } from "./api";

export async function getCotacoes() {
  const response = await fetch(`${API_BASE_URL}/cotacoes`);

  if (!response.ok) {
    throw new Error("Erro ao buscar cotações");
  }

  return response.json();
}

export async function createCotacao(data: {
  cliente_id: number;
  valor_total: number;
  observacoes?: string;
  etapa?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/cotacoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar cotação");
  }

  return response.json();
}
