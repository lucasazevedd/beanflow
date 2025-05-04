import { useState } from "react";
import { Sidebar } from "../components/sidebar";
// import { Header } from "../components/header";
import { Footer } from "../components/footer";

import "../styles/pages/criar-pages.css";

function formatarValor(valor: string) {
  const somenteNumeros = valor.replace(/\D/g, "");
  const valorFormatado = (parseInt(somenteNumeros || "0") / 100).toFixed(2);
  return "R$ " + valorFormatado.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


export default function CriarCotacao() {
  const [form, setForm] = useState({
    cliente: "",
    data: "",
    observacoes: "",
    valor: "",
  });

  const hoje = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (parseFloat(form.valor) <= 0 || isNaN(parseFloat(form.valor))) {
      alert("O valor da cotação deve ser maior que zero.");
      return;
    }
  
    console.log("Nova cotação:", form);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          {/* <Header /> */}
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>NOVO ORÇAMENTO</h2>

              <div className="grupo">
                <label htmlFor="cliente">Cliente<span>*</span></label>
                <input
                  type="text"
                  name="cliente"
                  id="cliente"
                  value={form.cliente}
                  onChange={handleChange}
                  required
                  placeholder="Digite um nome ou CNPJ..."
                />
              </div>

              <div className="grupo">
                <label htmlFor="valor">Valor Total (R$)<span>*</span></label>
                <input
                  type="text"
                  name="valor"
                  id="valor"
                  value={form.valor}
                  onChange={(e) =>
                    setForm({ ...form, valor: formatarValor(e.target.value) })
                  }
                  placeholder="R$ 0,00"
                  required
                />
              </div>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="data">Data<span>*</span></label>
                  <input
                    type="date"
                    name="data"
                    id="data"
                    value={form.data}
                    onChange={handleChange}
                    max={hoje}
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
        </div>
        <Footer />
      </div>
    </div>
  );
}
