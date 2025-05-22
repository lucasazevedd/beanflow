// pages/criar-cotacao.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import CampoClienteSelecionavel from "../components/campo-cliente-selecionavel";
import { Cliente } from "../types/Cliente";
import { createCotacao } from "../services/quoteService";
import { formatarMoeda, formatarParaNumero } from "../utils/money";

import "../styles/pages/criar-pages.css";

export default function CriarCotacao() {
  const [form, setForm] = useState({
    data_criacao: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0],
    valor: "",
    observacoes: "",
  });

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarMoeda(e.target.value);
    setForm((prev) => ({ ...prev, valor: valorFormatado }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteSelecionado) {
      alert("Selecione um cliente válido.");
      return;
    }

    const valor_total = form.valor.trim()
      ? formatarParaNumero(form.valor)
      : undefined;

    try {
      await createCotacao({
        cliente_id: clienteSelecionado.id,
        data_criacao: form.data_criacao,
        valor_total,
        observacoes: form.observacoes || undefined,
      });

      alert("Cotação criada com sucesso!");
      navigate("/cotacoes");
    } catch (error) {
      console.error("Erro ao criar cotação:", error);
      alert("Erro ao criar cotação.");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>NOVO ORÇAMENTO</h2>

              <div className="linha">
                <CampoClienteSelecionavel
                  clienteSelecionado={clienteSelecionado}
                  setClienteSelecionado={setClienteSelecionado}
                />
              </div>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="data_criacao">
                    Data da Cotação<span>*</span>
                  </label>
                  <input
                    type="date"
                    id="data_criacao"
                    name="data_criacao"
                    value={form.data_criacao}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grupo">
                  <label htmlFor="valor">Valor</label>
                  <input
                    type="text"
                    name="valor"
                    id="valor"
                    placeholder="R$ 0,00"
                    value={form.valor}
                    onChange={handleValorChange}
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
