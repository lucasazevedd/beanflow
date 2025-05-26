import { Tarefa } from "../../types/Tarefa";
import "../../styles/components/tabela-base.css";

interface TabelaTarefasProps {
  tarefas: Tarefa[];
  loading: boolean;
  onEdit: (id: number) => void;
}

export default function TabelaTarefas({ tarefas, loading, onEdit }: TabelaTarefasProps) {
  return (
    <div className="tabela-wrapper">
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4}>Carregando...</td></tr>
          ) : tarefas.length === 0 ? (
            <tr><td colSpan={4}>Nenhuma tarefa encontrada</td></tr>
          ) : (
            tarefas.map((tarefa) => (
              <tr key={tarefa.id} className="linha-clicavel" onClick={() => onEdit(tarefa.id)} style={{ cursor: "pointer" }}>
                <td>{tarefa.id}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
