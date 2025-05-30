import { API_BASE_URL } from "./api";

// Buscar todas as cotações
export async function getCotacoes() {
  const response = await fetch(`${API_BASE_URL}/cotacoes`);
  if (!response.ok) {
    console.error("Erro ao buscar cotações:", response.statusText);
    throw new Error("Erro ao buscar cotações");
  }
  return response.json();
}

// Buscar uma cotação pelo ID
export async function getCotacaoPorId(id: number) {
  const response = await fetch(`${API_BASE_URL}/cotacoes/${id}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro ao buscar cotação:", errorText);
    throw new Error("Erro ao buscar cotação");
  }
  return response.json();
}

// Criar nova cotação
export async function createCotacao(data: {
  cliente_id: number;
  valor_total?: number;
  observacoes?: string;
  etapa?: string;
  data_criacao?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/cotacoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro ao criar cotação:", errorText);
    throw new Error("Erro ao criar cotação");
  }

  return response.json();
}

// Atualizar uma cotação existente
export async function updateCotacao(id: number, data: {
  cliente_id: number;
  valor_total?: number;
  observacoes?: string;
  etapa?: string;
  data_criacao?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/cotacoes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(`Erro ao atualizar cotação: ${texto}`);
  }

  return response.json();
}

// Deletar uma cotação pelo ID
export async function deleteCotacao(id: number) {
  const response = await fetch(`${API_BASE_URL}/cotacoes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro ao deletar cotação:", errorText);
    throw new Error("Erro ao deletar cotação");
  }

  return response.json();
}
