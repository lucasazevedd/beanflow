import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import "../styles/criar-cotacao.css";

export default function CriarCotacao() {
  const [form, setForm] = useState({
    cliente: "",
    data: "",
    observacoes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova cotação:", form);
  };

  const hoje = new Date().toISOString().split("T")[0];

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <Header />
          <div className="criar-cotacao-wrapper">
            <form className="form-cotacao" onSubmit={handleSubmit}>
              <h2>NOVO ORÇAMENTO</h2>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="cliente">Cliente</label>
                  <input
                    type="text"
                    name="cliente"
                    id="cliente"
                    placeholder="Digite um nome ou CNPJ..."
                    value={form.cliente}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grupo">
                  <label htmlFor="data">Data</label>
                  <input
                    type="date"
                    name="data"
                    id="data"
                    max={hoje}
                    value={form.data}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grupo">
                <label htmlFor="observacoes">Observações</label>
                <textarea
                  name="observacoes"
                  id="observacoes"
                  value={form.observacoes}
                  onChange={handleChange}
                  placeholder="Adicione observações aqui..."
                />
              </div>

              <button type="submit">Criar</button>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
