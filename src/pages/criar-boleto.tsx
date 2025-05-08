import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import { getClientes } from "../services/clientService";
import { createBoleto } from "../services/boletoService";
import "../styles/pages/criar-pages.css";

interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
}

export default function CriarBoleto() {
  const [form, setForm] = useState({
    data: new Date().toISOString().split("T")[0],
    vencimento: "30",
    valor: ""
  });

  const [clienteBusca, setClienteBusca] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [clientes, setClientes] = useState<Cliente[]>([]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const formatarValor = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const numero = (parseInt(apenasNumeros || "0") / 100).toFixed(2);
    return "R$ " + numero.replace(".", ",");
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarValor(e.target.value);
    setForm({ ...form, valor: valorFormatado });
  };

  const calcularDataVencimento = (dias: number): string => {
    const dataBase = new Date(form.data);
    dataBase.setDate(dataBase.getDate() + dias);
    return dataBase.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteSelecionado) {
      alert("Selecione um cliente válido.");
      return;
    }

    const dataVencimento = calcularDataVencimento(parseInt(form.vencimento));

    const valorNumerico = parseFloat(
      form.valor.replace(/[^\d,]/g, "").replace(",", ".")
    );

    try {
      const payload = {
        cliente_id: clienteSelecionado.id,
        data: form.data,
        vencimento: dataVencimento,
        valor: valorNumerico.toFixed(2),
      };

      const response = await createBoleto(payload);

      alert("Boleto criado com sucesso!");
      console.log("Resposta:", response);
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
                <div className="grupo grupo-cliente">
                  <label htmlFor="cliente">Cliente<span>*</span></label>
                  <div className="grupo">
                    <input
                      type="text"
                      id="cliente"
                      placeholder="Digite um nome ou CNPJ..."
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
                        ❌
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
