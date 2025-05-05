import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
// import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { getClientes } from "../services/clientService";
import { createCotacao } from "../services/quoteService";

import "../styles/pages/criar-pages.css";

function formatarValor(valor: string) {
  const somenteNumeros = valor.replace(/\D/g, "");
  const valorFormatado = (parseInt(somenteNumeros || "0") / 100).toFixed(2);
  return "R$ " + valorFormatado.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function CriarCotacao() {
  const [form, setForm] = useState({
    clienteId: "",
    data: "",
    observacoes: "",
    valor: ""
  });

  const hoje = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const valorNumerico = parseFloat(
      form.valor.replace(/[^\d,]/g, "").replace(",", ".")
    );
  
    if (valorNumerico <= 0 || isNaN(valorNumerico)) {
      alert("O valor da cotação deve ser maior que zero.");
      return;
    }
  
    try {
      const response = await createCotacao({
        cliente_id: Number(form.clienteId),
        valor_total: valorNumerico,
        observacoes: form.observacoes,
        etapa: "Realizar orçamento", 
      });
  
      console.log("Cotação criada:", response.cotacao);
      alert("Cotação cadastrada com sucesso!");
      // redirecionar se quiser
    } catch (error) {
      console.error(error);
      alert("Erro ao criar cotação.");
    }
  };

  interface Cliente {
    id: number;
    nome: string;
    cnpj: string;
  }

  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    async function carregarClientes() {
      try {
        const data = await getClientes(); // serviço que busca os clientes
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    }
    carregarClientes();
  }, []);

  const [clienteBusca, setClienteBusca] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

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
                <label htmlFor="cliente">Cliente</label>
                <input
                  type="text"
                  id="cliente"
                  placeholder="Digite o nome do cliente"
                  value={clienteBusca}
                  onChange={(e) => {
                    setClienteBusca(e.target.value);
                    setClienteSelecionado(null); // Limpa seleção anterior
                  }}
                  disabled={!!clienteSelecionado}
                />
                {clienteBusca && (
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
                          setClienteSelecionado(cliente); // salva o cliente completo
                          setClienteBusca(`${cliente.nome} – ${cliente.cnpj}`); // preenche o campo de texto
                          setForm({ ...form, clienteId: cliente.id.toString() }); // salva apenas o ID
                        }}
                      >
                        {cliente.nome} – {cliente.cnpj}
                      </li>
                    ))}
                </ul>
                )}
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
