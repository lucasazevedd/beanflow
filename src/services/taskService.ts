import { API_BASE_URL } from "./api";

export async function createTarefa(tarefa: {
  responsavel: string;
  descricao: string;
}) {
  const response = await fetch(`${API_BASE_URL}/tarefas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar tarefa");
  }

  return response.json();
}

export async function getTarefas() {
    const response = await fetch(`${API_BASE_URL}/tarefas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Erro ao buscar tarefas");
    }
  
    return response.json();
  }
  
  export async function deleteTarefa(id: number) {
    const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Erro ao excluir tarefa");
    }
  }