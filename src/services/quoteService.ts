import api from "./api";

// Buscar todas as cotações
export async function getCotacoes() {
  const response = await api.get("/cotacoes");
  return response.data;
}

// Buscar uma cotação pelo ID
export async function getCotacaoPorId(id: number) {
  const response = await api.get(`/cotacoes/${id}`);
  return response.data;
}

// Criar nova cotação
export async function createCotacao(data: {
  cliente_id: number;
  valor_total?: number;
  observacoes?: string;
  etapa?: string;
  data_criacao?: string;
}) {
  const response = await api.post("/cotacoes", data);
  return response.data;
}

// Atualizar uma cotação existente
export async function updateCotacao(id: number, data: {
  cliente_id: number;
  valor_total?: number;
  observacoes?: string;
  etapa?: string;
  data_criacao?: string;
  status?: string;
}) {
  const response = await api.put(`/cotacoes/${id}`, data);
  return response.data;
}

// Deletar uma cotação pelo ID
export async function deleteCotacao(id: number) {
  const response = await api.delete(`/cotacoes/${id}`);
  return response.data;
}