import RightArrowIcon from "../assets/icons/right-arrow-icon";
import "../styles/tarefas-card.css";

export default function TarefasCard() {
  const tarefas = [
    {
      titulo: "7 PAPÉIS-TOALHA 100% PARA FECOMERCIO",
      descricao: "Entregar quando tiver alguma entrega próxima"
    },
    {
      titulo: "COTAR MATERIAL GRÁFICO",
      descricao: "Verificar com fornecedores para impressão de panfletos"
    },
    {
      titulo: "ENTREGAR CONTRATO",
      descricao: "Enviar contrato revisado para aprovação"
    }
  ];

  return (
    <div className="tarefas-card">
      <div className="tarefas-header">
        <span className="titulo">📌 TAREFAS</span>
        <button className="nova-tarefa">+ nova tarefa</button>
      </div>

      <ul className="tarefas-lista">
        {tarefas.map((tarefa, index) => (
          <li key={index} className="tarefa-item">
            <span className="tarefa-titulo">{tarefa.titulo}</span>
            <span className="tarefa-descricao">{tarefa.descricao}</span>
          </li>
        ))}
      </ul>

      <button className="ver-todas">
        <span>➡️ VER TODAS AS TAREFAS</span>
        <RightArrowIcon className="right-arrow-icon"/>
      </button>
    </div>
  );
}
