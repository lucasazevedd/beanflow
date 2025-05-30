import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import ClienteSelecionado from "../components/cliente-selecionado";
import { getBoletoPorId, updateBoleto, deleteBoleto } from "../services/boletoService";
import { getClientePorId } from "../services/clientService";
import { formatarMoeda, formatarParaNumero } from "../utils/money";
import { Cliente } from "../types/Cliente";

import "../styles/pages/criar-pages.css";

export default function EditarBoleto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    data_criacao: "",
    vencimento: "",
    valor: "",
    pago: false,
  });

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarBoleto() {
      try {
        const boleto = await getBoletoPorId(Number(id));

        if (!boleto.cliente_id) {
          throw new Error("Cliente ID indefinido");
        }

        const cliente = await getClientePorId(boleto.cliente_id);

        setForm({
          data_criacao: boleto.data_criacao?.split("T")[0] || "",
          vencimento: boleto.vencimento?.split("T")[0] || "",
          valor: formatarMoeda(boleto.valor),
          pago: boleto.pago || false,
        });

        setClienteSelecionado(cliente);
      } catch (error) {
        console.error("Erro ao carregar boleto:", error);
        alert("Erro ao buscar boleto.");
      } finally {
        setLoading(false);
      }
    }

    carregarBoleto();
  }, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarMoeda(e.target.value);
    setForm((prev) => ({ ...prev, valor: valorFormatado }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSelecionado) return;

    try {
      await updateBoleto(Number(id), {
        cliente_id: clienteSelecionado.id,
        data_criacao: form.data_criacao,
        vencimento: form.vencimento,
        valor: formatarParaNumero(form.valor).toFixed(2),
        pago: form.pago,
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
                <ClienteSelecionado cliente={clienteSelecionado} />

                <div className="grupo">
                  <label htmlFor="data_criacao">Data de Emissão</label>
                  <input
                    type="date"
                    name="data_criacao"
                    id="data_criacao"
                    value={form.data_criacao}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="vencimento">Data de Vencimento</label>
                  <input
                    type="date"
                    name="vencimento"
                    id="vencimento"
                    value={form.vencimento}
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
                <label htmlFor="pago">
                  <input
                    type="checkbox"
                    id="pago"
                    name="pago"
                    checked={form.pago}
                    onChange={handleChange}
                  />
                  Marcar como pago
                </label>
              </div>

              <div className="linha" style={{ justifyContent: "space-between" }}>
                <button type="submit" disabled={loading}>Salvar</button>
                <button
                  type="button"
                  className="button-excluir"  
                  onClick={handleExcluir}
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
