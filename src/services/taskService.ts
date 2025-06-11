import api from "./api";

// Criar nova tarefa
export async function createTarefa(tarefa: {
  titulo: string;
  descricao: string;
}) {
  const response = await api.post("/tarefas", tarefa);
  return response.data;
}

// Buscar todas as tarefas
export async function getTarefas() {
  const response = await api.get("/tarefas");
  return response.data;
}

// Buscar uma tarefa por ID
export async function getTarefaPorId(id: number) {
  const response = await api.get(`/tarefas/${id}`);
  return response.data;
}

// Atualizar uma tarefa existente
export async function updateTarefa(id: number, tarefa: {
  titulo: string;
  descricao: string;
}) {
  const response = await api.put(`/tarefas/${id}`, tarefa);
  return response.data;
}

// Excluir uma tarefa
export async function deleteTarefa(id: number) {
  const response = await api.delete(`/tarefas/${id}`);
  return response.data;
}