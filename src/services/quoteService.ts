import { API_BASE_URL } from "./api";

export async function getCotacoes() {
  const response = await fetch(`${API_BASE_URL}/cotacoes`);

  if (!response.ok) {
    throw new Error("Erro ao buscar cotações");
  }

  return response.json();
}

export async function createCotacao({
  clienteId,
  valor,
  observacoes,
  etapa = "Realizar orçamento"
}: {
  clienteId: number;
  valor: string; // Ex: "R$ 999,99"
  observacoes?: string;
  etapa?: string;
}) {
  const valorNumerico = parseFloat(
    valor.replace(/[^\d,]/g, "").replace(",", ".")
  );

  const response = await fetch(`${API_BASE_URL}/cotacoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cliente_id: clienteId,
      valor_total: valorNumerico,
      observacoes,
      etapa
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || "Erro ao criar cotação");
  }

  return response.json(); // Retorna: { message, cotacao }
}
