import api from "./api";

// Lista todos os boletos
export async function getBoletos() {
  const response = await api.get("/boletos");
  return response.data;
}

// Cria um novo boleto
export async function createBoleto(data: {
  cliente_id: number;
  data: string;
  vencimento: string;
  valor: string;
}) {
  const response = await api.post("/boletos", data);
  return response.data;
}

// Busca um boleto pelo ID
export async function getBoletoPorId(id: number) {
  const response = await api.get(`/boletos/${id}`);
  return response.data;
}

// Atualiza um boleto existente
export async function updateBoleto(id: number, data: {
  cliente_id: number;
  data_criacao: string;
  vencimento: string;
  valor: string;
  pago?: boolean;
}) {
  const response = await api.put(`/boletos/${id}`, data);
  return response.data;
}

// Deleta um Boleto
export async function deleteBoleto(id: number) {
  const response = await api.delete(`/boletos/${id}`);
  return response.data;
}