import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import { createTarefa } from "../services/taskService";
import { useNavigate } from "react-router-dom";

import "../styles/pages/criar-pages.css";

export default function CriarTarefa() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!form.titulo) {
      alert("O campo título é obrigatório.");
      return;
    }
  
    try {
      await createTarefa({
        titulo: form.titulo,
        descricao: form.descricao,
      });
      alert("Tarefa criada com sucesso!");
      setForm({ titulo: "", descricao: "" });
      navigate("/tarefas");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar tarefa.");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>NOVA TAREFA</h2>

              <div className="grupo">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  placeholder="Digite o título da tarefa"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grupo">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  placeholder="Digite a descrição da tarefa"
                  value={form.descricao}
                  onChange={handleChange}
                />
              </div>

              <button type="submit">Criar</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
