import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import { getClientePorId, updateCliente, deleteCliente } from "../services/clientService";
import { Cliente } from "../types/Cliente";

import "../styles/pages/criar-pages.css";

export default function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    razao_social: "",
    telefone: "",
    email: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarCliente() {
      try {
        const cliente: Cliente = await getClientePorId(Number(id));
        setForm({
          nome: cliente.nome || "",
          cnpj: cliente.cnpj || "",
          razao_social: cliente.razao_social || "",
          telefone: cliente.telefone || "",
          email: cliente.email || ""
        });
      } catch (error) {
        console.error("Erro ao carregar cliente:", error);
        alert("Erro ao buscar cliente.");
      } finally {
        setLoading(false);
      }
    }

    carregarCliente();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateCliente(Number(id), form);
      alert("Cliente atualizado com sucesso!");
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente.");
    }
  };

  const handleExcluir = async () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este cliente?");
    if (!confirmacao) return;

    try {
      await deleteCliente(Number(id));
      alert("Cliente excluído com sucesso!");
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      alert("Erro ao excluir cliente.");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>CLIENTE Nº {id}</h2>

              <div className="grupo">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grupo">
                <label htmlFor="cnpj">CNPJ</label>
                <input
                  type="text"
                  name="cnpj"
                  id="cnpj"
                  value={form.cnpj}
                  onChange={handleChange}
                />
              </div>

              <div className="grupo">
                <label htmlFor="razao_social">Razão Social</label>
                <input
                  type="text"
                  name="razao_social"
                  id="razao_social"
                  value={form.razao_social}
                  onChange={handleChange}
                />
              </div>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="text"
                    name="telefone"
                    id="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                  />
                </div>

                <div className="grupo">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="linha" style={{ justifyContent: "space-between", gap: "0.5rem" }}>
                <button type="submit" disabled={loading}>Salvar</button>
                <button
                  type="button"
                  onClick={handleExcluir}
                  className="button-excluir"
                >
                  Excluir cliente
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
