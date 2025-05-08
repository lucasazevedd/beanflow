import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";

import SearchBar from "../components/search-bar";
import BotaoNovo from "../components/botao-novo";
import { getTarefas, deleteTarefa } from "../services/taskService";

import "../styles/pages/lista-pages.css";

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
}

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const data = await getTarefas();
        setTarefas(data);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarTarefas();
  }, []);

  async function handleExcluir(id: number) {
    try {
      await deleteTarefa(id);
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.filter((tarefa) => tarefa.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  }

  const tarefasFiltradas = tarefas.filter((tarefa) =>
    tarefa.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
    tarefa.descricao.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="lista-page-container">
            <div className="top-bar">
              <SearchBar onSearch={setTermoBusca} />
              <div className="botoes">
                <BotaoNovo rota="/tarefas/novo" texto="NOVA TAREFA" />
              </div>
            </div>

            <div className="tabela-clientes-wrapper">
              <table className="tabela-clientes">
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
                  ) : tarefasFiltradas.length === 0 ? (
                    <tr><td colSpan={4}>Nenhuma tarefa encontrada</td></tr>
                  ) : (
                    tarefasFiltradas.map((tarefa) => (
                      <tr key={tarefa.id}>
                        <td>{tarefa.id}</td>
                        <td>{tarefa.titulo}</td>
                        <td>{tarefa.descricao}</td>
                        <td>
                          <button className="task-buttons" onClick={() => handleExcluir(tarefa.id)} title="Concluir">
                            Concluir ✅
                          </button>
                          <button className="task-buttons" onClick={() => handleExcluir(tarefa.id)} title="Excluir">
                            Excluir ❌
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
