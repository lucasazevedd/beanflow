import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RightArrowIcon from "../../assets/icons/right-arrow-icon";
import { getTarefas } from "../../services/taskService";
import { Tarefa } from "../../types/Tarefa";
import BotaoNovo from "../../components/botao-novo"

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
      <BotaoNovo rota="/tarefas/novo" texto="NOVA TAREFA"/>

      <ul className="widget-lista">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="widget-item-task" onClick={() => navigate(`/tarefas/editar/${tarefa.id}`)}>
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