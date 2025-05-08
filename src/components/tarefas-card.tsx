import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RightArrowIcon from "../assets/icons/right-arrow-icon";
import { getTarefas } from "../services/taskService";

import "../styles/components/tarefas-card.css";

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
}

export default function TarefasCard() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTarefas() {
      try {
        const data = await getTarefas();
        setTarefas(data.slice(0, 5)); // exibe no máximo 5
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    }

    fetchTarefas();
  }, []);

  return (
    <div className="tarefas-card">
      <div className="tarefas-header">
        <span className="titulo">📌 TAREFAS</span>
        <button className="nova-tarefa" onClick={() => navigate("/tarefas/novo")}>
          + nova tarefa
        </button>
      </div>

      <ul className="tarefas-lista">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="tarefa-item">
            <span className="tarefa-titulo">{tarefa.titulo}</span>
            <span className="tarefa-descricao">{tarefa.descricao}</span>
          </li>
        ))}
      </ul>

      <button className="ver-todas" onClick={() => navigate("/tarefas")}>
        <span>➡️ VER TODAS AS TAREFAS</span>
        <RightArrowIcon className="right-arrow-icon" />
      </button>
    </div>
  );
}
