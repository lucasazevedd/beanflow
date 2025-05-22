import { Tarefa } from "../../types/Tarefa";
import "../../styles/components/tabela-base.css";

interface TabelaTarefasProps {
  tarefas: Tarefa[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function TabelaTarefas({ tarefas, loading, onDelete }: TabelaTarefasProps) {
  return (
    <div className="tabela-wrapper">
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4}>Carregando...</td></tr>
          ) : tarefas.length === 0 ? (
            <tr><td colSpan={4}>Nenhuma tarefa encontrada</td></tr>
          ) : (
            tarefas.map((tarefa) => (
              <tr key={tarefa.id}>
                <td>{tarefa.id}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td className="task-buttons">
                  <button className="task-button" onClick={() => onDelete(tarefa.id)} title="Concluir">
                    ✅
                  </button>
                  <button className="task-button" onClick={() => onDelete(tarefa.id)} title="Excluir">
                    ❌
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
