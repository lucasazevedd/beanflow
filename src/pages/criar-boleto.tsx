import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import CampoClienteSelecionavel from "../components/campo-cliente-selecionavel";
import { Cliente } from "../types/Cliente";
import { createBoleto } from "../services/boletoService";
import { formatarMoeda, formatarParaNumero } from "../utils/money";
import { calcularDataVencimento } from "../utils/date";
import { useNavigate } from "react-router-dom";

import "../styles/pages/criar-pages.css";

export default function CriarBoleto() {
  const [form, setForm] = useState({
    data: new Date().toISOString().split("T")[0],
    vencimento: "30",
    valor: ""
  });

  const navigate = useNavigate();

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarMoeda(e.target.value);
    setForm({ ...form, valor: valorFormatado });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteSelecionado) {
      alert("Selecione um cliente válido.");
      return;
    }

    const dias = parseInt(form.vencimento);
    const dataVencimento = calcularDataVencimento(form.data, dias);
    const valorNumerico = formatarParaNumero(form.valor);

    try {
      await createBoleto({
        cliente_id: clienteSelecionado.id,
        data: form.data,
        vencimento: dataVencimento,
        valor: valorNumerico.toFixed(2)
      });

      alert("Boleto criado com sucesso!");
      navigate("/boletos");
    } catch (error) {
      console.error("Erro ao criar boleto:", error);
      alert("Erro ao criar boleto.");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>NOVO BOLETO</h2>

              <div className="linha">
                <CampoClienteSelecionavel
                  clienteSelecionado={clienteSelecionado}
                  setClienteSelecionado={setClienteSelecionado}
                />

                <div className="grupo">
                  <label htmlFor="data">Data</label>
                  <input
                    type="date"
                    name="data"
                    id="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="vencimento">Vencimento</label>
                  <select
                    name="vencimento"
                    id="vencimento"
                    value={form.vencimento}
                    onChange={handleChange}
                  >
                    <option value="21">21 dias</option>
                    <option value="30">30 dias</option>
                  </select>
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
                    required
                  />
                </div>
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
