import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import { getClientes } from "../services/clientService";
import { createCotacao } from "../services/quoteService";
import { useNavigate } from "react-router-dom";

import "../styles/pages/criar-pages.css";

function formatarValor(valor: string) {
  const somenteNumeros = valor.replace(/\D/g, "");
  const valorFormatado = (parseInt(somenteNumeros || "0") / 100).toFixed(2);
  return "R$ " + valorFormatado.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
}

export default function CriarCotacao() {
  const [form, setForm] = useState({
    valor: "",
    observacoes: "",
    data_criacao: new Date().toISOString().split("T")[0],
  });
  

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteBusca, setClienteBusca] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarClientes() {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    }

    carregarClientes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteSelecionado) {
      alert("Selecione um cliente da lista.");
      return;
    }

    const valorNumerico = Number(
      parseFloat(form.valor.replace(/[^\d,]/g, "").replace(",", ".")).toFixed(2)
    );

    let valor_total = isNaN(valorNumerico) ? undefined : valorNumerico;

    try {
      const response = await createCotacao({
        cliente_id: clienteSelecionado.id,
        valor_total,
        observacoes: form.observacoes || undefined,
        data_criacao: form.data_criacao,
      });

      console.log("Cotação criada:", response.cotacao);
      alert("Cotação cadastrada com sucesso!");
      navigate("/cotacoes");
    } catch (error) {
      console.error(error);
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
                <div className="grupo grupo-cliente">
                  <label htmlFor="cliente">Cliente<span>*</span></label>
                  <div className="grupo">
                    <input
                      type="text"
                      id="cliente"
                      placeholder="Digite o nome do cliente"
                      value={clienteBusca}
                      onChange={(e) => {
                        setClienteBusca(e.target.value);
                        setClienteSelecionado(null);
                      }}
                      disabled={!!clienteSelecionado}
                      required
                    />
                    {clienteSelecionado && (
                      <button
                        type="button"
                        className="limpar-cliente"
                        onClick={() => {
                          setClienteBusca("");
                          setClienteSelecionado(null);
                        }}
                      >
                        limpar seleção
                      </button>
                    )}
                  </div>
                  {clienteBusca && !clienteSelecionado && (
                    <ul className="sugestoes-clientes">
                      {clientes
                        .filter((c) =>
                          c.nome.toLowerCase().includes(clienteBusca.toLowerCase()) ||
                          c.cnpj.includes(clienteBusca)
                        )
                        .slice(0, 5)
                        .map((cliente) => (
                          <li
                            key={cliente.id}
                            onClick={() => {
                              setClienteSelecionado(cliente);
                              setClienteBusca(`${cliente.nome} – ${cliente.cnpj}`);
                            }}
                          >
                            {cliente.nome} – {cliente.cnpj}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>

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
                <label htmlFor="valor">Valor Total (R$)</label>
                <input
                  type="text"
                  name="valor"
                  id="valor"
                  value={form.valor}
                  onChange={(e) =>
                    setForm({ ...form, valor: formatarValor(e.target.value) })
                  }
                  placeholder="R$ 0,00"
                />
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
