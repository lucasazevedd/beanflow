import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import { getBoletoPorId, updateBoleto, deleteBoleto } from "../services/boletoService";
import { calcularDataVencimento, calcularDiasParaVencimento } from "../utils/date";
import { formatarMoeda, formatarParaNumero } from "../utils/money";
import { Cliente } from "../types/Cliente";

import "../styles/pages/criar-pages.css";

export default function EditarBoleto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    data: "",
    vencimento: "30",
    valor: ""
  });

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarBoleto() {
      try {
        const boleto = await getBoletoPorId(Number(id));
        setForm({
          data: boleto.data,
          vencimento: calcularDiasParaVencimento(boleto.data, boleto.vencimento).toString(),
          valor: formatarMoeda(boleto.valor)
        });
        setClienteSelecionado(boleto.cliente);
      } catch (error) {
        console.error("Erro ao carregar boleto:", error);
        alert("Erro ao buscar boleto.");
      } finally {
        setLoading(false);
      }
    }

    carregarBoleto();
  }, [id]);

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
    if (!clienteSelecionado) return;

    const dias = parseInt(form.vencimento);
    const dataVencimento = calcularDataVencimento(form.data, dias);
    const valorNumerico = form.valor.trim() ? formatarParaNumero(form.valor) : 0;

    try {
      await updateBoleto(Number(id), {
        cliente_id: clienteSelecionado.id,
        data: form.data,
        vencimento: dataVencimento,
        valor: valorNumerico.toFixed(2)
      });

      alert("Boleto atualizado com sucesso!");
      navigate("/boletos");
    } catch (error) {
      console.error("Erro ao atualizar boleto:", error);
      alert("Erro ao atualizar boleto.");
    }
  };

  const handleExcluir = async () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este boleto?");
    if (!confirmacao) return;

    try {
      await deleteBoleto(Number(id));
      alert("Boleto excluído com sucesso!");
      navigate("/boletos");
    } catch (error) {
      console.error("Erro ao excluir boleto:", error);
      alert("Erro ao excluir boleto.");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>BOLETO Nº {id}</h2>

              <div className="linha">
                <div className="grupo">
                  <label>Cliente</label>
                  <input
                    type="text"
                    value={clienteSelecionado?.nome || ""}
                    disabled
                  />
                </div>

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
                  />
                </div>
              </div>

              <div className="linha" style={{ justifyContent: "space-between" }}>
                <button type="submit" disabled={loading}>Salvar</button>
                <button
                  type="button"
                  className="limpar-cliente"
                  onClick={handleExcluir}
                  style={{ color: "red" }}
                >
                  Excluir boleto
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
