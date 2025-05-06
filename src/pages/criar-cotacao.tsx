import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
// import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { getClientes } from "../services/clientService";
import { createCotacao } from "../services/quoteService";
import { useNavigate } from "react-router-dom";

import "../styles/pages/criar-pages.css";

// Função para formatar o valor exibido no campo
function formatarValor(valor: string) {
  const somenteNumeros = valor.replace(/\D/g, "");
  const valorFormatado = (parseInt(somenteNumeros || "0") / 100).toFixed(2);
  return "R$ " + valorFormatado.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function CriarCotacao() {
  const [form, setForm] = useState({
    cliente_id: "",
    valor: "",
    observacoes: "",
  });

  const [clienteBusca, setClienteBusca] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  interface Cliente {
    id: number;
    nome: string;
    cnpj: string;
  }

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
      parseFloat(
        form.valor.replace(/[^\d,]/g, "").replace(",", ".")
      ).toFixed(2)
    );

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Digite um valor válido para a cotação.");
      return;
    }

    try {
      const response = await createCotacao({
        cliente_id: clienteSelecionado.id,
        valor_total: valorNumerico,
        observacoes: form.observacoes || undefined,
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
          {/* <Header /> */}
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>NOVO ORÇAMENTO</h2>

              <div className="grupo">
                <label htmlFor="clienteId">Cliente<span>*</span></label>
                <select
                  id="clienteId"
                  name="clienteId"
                  value={form.cliente_id}
                  onChange={(e) =>
                    setForm({ ...form, cliente_id: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome} – {cliente.cnpj}
                    </option>
                  ))}
                </select>
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
