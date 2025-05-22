import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RightArrowIcon from "../../assets/icons/right-arrow-icon";
import { getTarefas } from "../../services/taskService";
import { Tarefa } from "../../types/Tarefa";

import "../../styles/components/widgets-card.css";

export default function TarefasCard() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTarefas() {
      try {
        const data = await getTarefas();
        setTarefas(data.slice(0, 5)); // Mostrar no máximo 5 tarefas
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    }

    fetchTarefas();
  }, []);

  return (
    <div className="widget-card">
      <div className="widget-header">
        <span className="widget-title">TAREFAS</span>
        <button
          className="widget-action"
          onClick={() => navigate("/tarefas/novo")}
        >
          + nova tarefa
        </button>
      </div>

      <ul className="widget-list">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="widget-item">
            <div className="widget-item-header">{tarefa.titulo}</div>
            <div className="widget-item-description">{tarefa.descricao}</div>
          </li>
        ))}
      </ul>

      <button className="widget-button" onClick={() => navigate("/tarefas")}>
        <span>VER TODAS AS TAREFAS</span>
        <RightArrowIcon />
      </button>
    </div>
  );
}