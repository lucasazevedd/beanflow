import { API_BASE_URL } from "./api";

export async function getBoletos() {
  const response = await fetch(`${API_BASE_URL}/boletos`);
  if (!response.ok) {
    throw new Error("Erro ao buscar boletos");
  }
  return response.json();
}

export async function createBoleto(data: {
    cliente_id: number;
    data: string;
    vencimento: string;
    valor: string; // ou number se for convertido no backend
  }) {
    const response = await fetch(`${API_BASE_URL}/boletos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const texto = await response.text();
      throw new Error(`Erro ao criar boleto: ${texto}`);
    }
  
    return response.json();
  }