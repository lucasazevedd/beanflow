import "../styles/pages/criar-pages.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import ClienteSelecionado from "../components/cliente-selecionado";
import { Cliente } from "../types/Cliente";
import { getCotacaoPorId, updateCotacao, deleteCotacao } from "../services/quoteService";
import { formatarMoeda, formatarParaNumero } from "../utils/money";
import { opcoesEtapasCotacao } from "../constants/etapasCotacoes";
import { getClientePorId } from "../services/clientService";
import StepperEtapas from "../components/stepper-cotacoes";

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
  const [mensagemEtapa, setMensagemEtapa] = useState("");

  useEffect(() => {
    async function carregarCotacao() {
      try {
        const cotacao = await getCotacaoPorId(Number(id));
        const cliente = await getClientePorId(cotacao.cliente_id);

        let dataFormatada = "";
        if (cotacao.data_criacao) {
          const raw = new Date(cotacao.data_criacao).toISOString();
          dataFormatada = raw.split("T")[0];
        }

        setForm({
          data_criacao: dataFormatada,
          valor: formatarMoeda(cotacao.valor_total || 0),
          observacoes: cotacao.observacoes || "",
          etapa: cotacao.etapa || ""
        });

        setClienteSelecionado(cliente);
      } catch (error) {
        console.error("Erro ao carregar cotação ou cliente:", error);
        alert("Erro ao buscar dados da cotação.");
      } finally {
        setLoading(false);
      }
    }

    carregarCotacao();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarMoeda(e.target.value);
    setForm((prev) => ({ ...prev, valor: valorFormatado }));
  };

  const handleEtapaChange = async (novaEtapa: string) => {
    if (!clienteSelecionado) return;

    try {
      await updateCotacao(Number(id), {
        cliente_id: clienteSelecionado.id,
        data_criacao: form.data_criacao,
        valor_total: form.valor.trim() ? formatarParaNumero(form.valor) : 0,
        observacoes: form.observacoes,
        etapa: novaEtapa
      });

      setForm((prev) => ({ ...prev, etapa: novaEtapa }));
      setMensagemEtapa("Etapa atualizada com sucesso!");

      // Limpa a mensagem após 3 segundos
      setTimeout(() => setMensagemEtapa(""), 3000);
    } catch (error) {
      console.error("Erro ao atualizar etapa:", error);
      setMensagemEtapa("Erro ao atualizar etapa.");
    }
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
        etapa: form.etapa // ✅ Etapa será enviada somente aqui
      });

      alert("Cotação atualizada com sucesso!");
      navigate("/cotacoes");
    } catch (error) {
      console.error("Erro ao atualizar cotação:", error);
      alert("Erro ao atualizar cotação.");
    }
  };

  const handleExcluir = async () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir esta cotação?");
    if (!confirmacao) return;

    try {
      await deleteCotacao(Number(id));
      alert("Cotação excluída com sucesso!");
      navigate("/cotacoes");
    } catch (error) {
      console.error("Erro ao excluir cotação:", error);
      alert("Erro ao excluir cotação.");
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>COTAÇÃO Nº {id}</h2>

              <div className="linha">
                <ClienteSelecionado cliente={clienteSelecionado} />
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
                <label>Etapa</label>
                <StepperEtapas
                  etapas={opcoesEtapasCotacao}
                  etapaAtual={form.etapa}
                  onEtapaChange={handleEtapaChange}
                />
                {mensagemEtapa && (
                  <span className="mensagem-etapa">{mensagemEtapa}</span>
                )}
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

              <div className="linha" style={{ justifyContent: "space-between" }}>
                <button type="submit" disabled={loading || !form.data_criacao || !clienteSelecionado}>
                  Salvar
                </button>
                <button type="button" className="button-excluir" onClick={handleExcluir}>
                  Excluir
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