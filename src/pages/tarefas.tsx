import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import SearchBar from "../components/search-bar";
import BotaoNovo from "../components/botao-novo";
import { getTarefas, deleteTarefa } from "../services/taskService";
import { Tarefa } from "../types/Tarefa";
import TabelaTarefas from "../components/tabela-tarefas";

import "../styles/pages/lista-pages.css";

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

  const handleExcluir = async (id: number) => {
    try {
      await deleteTarefa(id);
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

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

            <TabelaTarefas tarefas={tarefasFiltradas} loading={loading} onDelete={handleExcluir} />

          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
