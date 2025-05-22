import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import CampoClienteSelecionavel from "../components/campo-cliente-selecionavel";
import { Cliente } from "../types/Cliente";
import { getCotacaoPorId, updateCotacao } from "../services/quoteService";
import { formatarMoeda, formatarParaNumero } from "../utils/money";
import { nomesEtapasCotacao } from "../utils/etapasCotacao";


import "../styles/pages/criar-pages.css";

export default function EditarCotacao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    data_criacao: "",
    valor: "",
    observacoes: "",
    etapa: ""
  });

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarCotacao() {
      try {
        const cotacao = await getCotacaoPorId(Number(id));
        setForm({
          data_criacao: cotacao.data_criacao,
          valor: formatarMoeda(cotacao.valor_total || 0),
          observacoes: cotacao.observacoes || "",
          etapa: cotacao.etapa || ""
        });
        setClienteSelecionado(cotacao.cliente); // objeto completo
      } catch (error) {
        console.error("Erro ao carregar cotação:", error);
        alert("Erro ao buscar cotação.");
      } finally {
        setLoading(false);
      }
    }

    carregarCotacao();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      alert("Cliente inválido.");
      return;
    }

    try {
      await updateCotacao(Number(id), {
        cliente_id: clienteSelecionado.id,
        data_criacao: form.data_criacao,
        valor_total: form.valor.trim() ? formatarParaNumero(form.valor) : 0,
        observacoes: form.observacoes,
        etapa: form.etapa
      });

      alert("Cotação atualizada com sucesso!");
      navigate("/cotacoes");
    } catch (error) {
      console.error("Erro ao atualizar cotação:", error);
      alert("Erro ao atualizar cotação.");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>NOVA COTAÇÃO</h2>

              <div className="linha">
                <CampoClienteSelecionavel
                  clienteSelecionado={clienteSelecionado}
                  setClienteSelecionado={() => {}} // campo desativado
                />
              </div>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="data_criacao">Data da Cotação<span>*</span></label>
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
                <label htmlFor="etapa">Etapa</label>
                <select name="etapa" id="etapa" value={form.etapa} onChange={handleChange}>
                  {nomesEtapasCotacao.map((etapa) => (
                    <option key={etapa} value={etapa}>{etapa}</option>
                  ))}
                </select>
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

              <button type="submit" disabled={loading}>Salvar</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
