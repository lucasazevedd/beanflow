import { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import SearchBar from "../components/search-bar";
import BotaoNovo from "../components/botao-novo";
import { getTarefas } from "../services/taskService";
import { Tarefa } from "../types/Tarefa";
import TabelaTarefas from "../components/tabelas/tabela-tarefas";
import { useNavigate } from "react-router-dom";

import "../styles/pages/lista-pages.css";

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");
  const [sidebarAberto, setSidebarAberto] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleEditar = (id: number) => {
    navigate(`/tarefas/editar/${id}`);
  };

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

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        sidebarAberto &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [sidebarAberto]);

  const tarefasFiltradas = tarefas.filter((tarefa) =>
    tarefa.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
    tarefa.descricao.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="home">
      {/* Botão de abrir sidebar no mobile */}
      <button
        className={`botao-menu-mobile ${sidebarAberto ? "oculto" : ""}`}
        onClick={() => setSidebarAberto(true)}
      >
        ☰
      </button>

      <Sidebar
        aberto={sidebarAberto}
        onFechar={() => setSidebarAberto(false)}
        sidebarRef={sidebarRef}
      />

      <div className="main">
        <div className="content">
          <div className="lista-page-container">
            <div className="top-bar">
              <SearchBar onSearch={setTermoBusca} />
              <div className="botoes">
                <BotaoNovo rota="/tarefas/novo" texto="NOVA TAREFA" />
              </div>
            </div>

            <TabelaTarefas
              tarefas={tarefasFiltradas}
              loading={loading}
              onEdit={handleEditar}
            />

            <BotaoNovo
              rota="/tarefas/novo"
              texto="NOVA TAREFA"
              className="botao-novo-mobile"
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}