import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import { getTarefaPorId, updateTarefa, deleteTarefa } from "../services/taskService";

import "../styles/pages/criar-pages.css";

export default function EditarTarefa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descricao: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarTarefa() {
      try {
        const tarefa = await getTarefaPorId(Number(id));
        setForm({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao || ""
        });
      } catch (error) {
        console.error("Erro ao carregar tarefa:", error);
        alert("Erro ao buscar tarefa.");
      } finally {
        setLoading(false);
      }
    }

    carregarTarefa();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateTarefa(Number(id), {
        titulo: form.titulo,
        descricao: form.descricao
      });

      alert("Tarefa atualizada com sucesso!");
      navigate("/tarefas");
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Erro ao atualizar tarefa.");
    }
  };

  const handleExcluir = async () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir esta tarefa?");
    if (!confirmacao) return;

    try {
      await deleteTarefa(Number(id));
      alert("Tarefa excluída com sucesso!");
      navigate("/tarefas");
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      alert("Erro ao excluir tarefa.");
    }
  };

  const handleConcluir = async () => {
    const confirmacao = window.confirm("Deseja marcar esta tarefa como concluída?");
    if (!confirmacao) return;

    try {
      await deleteTarefa(Number(id)); // Considerando que concluir = remover
      alert("Tarefa concluída com sucesso!");
      navigate("/tarefas");
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
      alert("Erro ao concluir tarefa.");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>TAREFA Nº {id}</h2>

              <div className="grupo">
                <label htmlFor="titulo">Título<span>*</span></label>
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grupo">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  name="descricao"
                  id="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                />
              </div>

              <div className="linha" style={{ justifyContent: "space-between" }}>
                <button type="submit" disabled={loading}>Salvar</button>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                        type="button"
                        onClick={handleConcluir}
                        className="button-concluir"
                        >
                        Concluir tarefa
                    </button>
                    <button
                        type="button"
                        onClick={handleExcluir}
                        className="button-excluir"
                        >
                        Excluir tarefa
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
