import { API_BASE_URL } from "./api";

// Criar nova tarefa
export async function createTarefa(tarefa: {
  titulo: string;
  descricao: string;
}) {
  const response = await fetch(`${API_BASE_URL}/tarefas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarefa),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar tarefa");
  }

  return response.json();
}

// Buscar todas as tarefas
export async function getTarefas() {
  const response = await fetch(`${API_BASE_URL}/tarefas`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar tarefas");
  }

  return response.json();
}

// Buscar uma tarefa por ID
export async function getTarefaPorId(id: number) {
  const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar tarefa");
  }

  return response.json();
}

// Atualizar uma tarefa existente
export async function updateTarefa(id: number, tarefa: {
  titulo: string;
  descricao: string;
}) {
  const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarefa),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }

  return response.json();
}

// Excluir uma tarefa
export async function deleteTarefa(id: number) {
  const response = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir tarefa");
  }
}
