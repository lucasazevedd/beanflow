import { API_BASE_URL } from "./api";

// Lista todos os boletos
export async function getBoletos() {
  const response = await fetch(`${API_BASE_URL}/boletos`);
  if (!response.ok) {
    throw new Error("Erro ao buscar boletos");
  }
  return response.json();
}

// Cria um novo boleto
export async function createBoleto(data: {
  cliente_id: number;
  data: string;
  vencimento: string;
  valor: string;
}) {
  const response = await fetch(`${API_BASE_URL}/boletos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(`Erro ao criar boleto: ${texto}`);
  }

  return response.json();
}

// Busca um boleto pelo ID
export async function getBoletoPorId(id: number) {
  const response = await fetch(`${API_BASE_URL}/boletos/${id}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar boleto com ID ${id}`);
  }
  return response.json();
}

// Atualiza um boleto existente
export async function updateBoleto(id: number, data: {
  cliente_id: number;
  data_criacao: string;
  vencimento: string;
  valor: string;
}) {
  const response = await fetch(`${API_BASE_URL}/boletos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(`Erro ao atualizar boleto: ${texto}`);
  }

  return response.json();
}

// Deleta um Boleto
export async function deleteBoleto(id: number) {
  const response = await fetch(`${API_BASE_URL}/boletos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const texto = await response.text();
    throw new Error(`Erro ao excluir boleto: ${texto}`);
  }

  return response.json();
}
