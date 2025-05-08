import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
// import { Header } from "../components/header";
import { Footer } from "../components/footer";

import SearchBar from "../components/search-bar";
import BotaoFiltro from "../components/filters";
import BotaoNovo from "../components/botao-novo";
import { getCotacoes } from "../services/quoteService";
import { getClientes } from "../services/clientService";

import "../styles/pages/lista-pages.css";

interface Cotacao {
  id: number;
  cliente_id: number;
  data_criacao: string;
  status: string;
  etapa: string;
  valor_total: number;
  observacoes: string;
}

interface Cliente {
  id: number;
  nome: string;
}

const [clientes, setClientes] = useState<Cliente[]>([]);

const getNomeCliente = (cliente_id: number) => {
  const cliente = clientes.find((c) => c.id === cliente_id);
  return cliente ? cliente.nome : `ID ${cliente_id}`;
};

export default function ListaCotacoes() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const [cotacoesData, clientesData] = await Promise.all([
          getCotacoes(),
          getClientes()
        ]);
        setCotacoes(cotacoesData);
        setClientes(clientesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
  
    carregarDados();
  }, []);
  

  const cotacoesFiltradas = cotacoes.filter((cotacao) =>
    cotacao.status?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cotacao.etapa?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    String(cotacao.cliente_id).includes(termoBusca)
  );

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          {/* <Header /> */}
          <div className="lista-page-container">
            <div className="top-bar">
              <SearchBar onSearch={setTermoBusca} />
              <div className="botoes">
                <BotaoFiltro />
                <BotaoNovo rota="/cotacoes/novo" texto="NOVO ORÇAMENTO" />
              </div>
            </div>

            <div className="tabela-clientes-wrapper">
              <table className="tabela-clientes">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Etapa</th>
                    <th>Valor</th>
                    <th>Observações</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7}>Carregando...</td></tr>
                  ) : cotacoesFiltradas.length === 0 ? (
                    <tr><td colSpan={7}>Nenhuma cotação encontrada</td></tr>
                  ) : (
                    cotacoesFiltradas.map((cotacao) => (
                      <tr key={cotacao.id}>
                        <td>{cotacao.id}</td>
                        <td>{getNomeCliente(cotacao.cliente_id)}</td>
                        <td>{new Date(cotacao.data_criacao).toLocaleDateString()}</td>
                        <td>{cotacao.status}</td>
                        <td>{cotacao.etapa}</td>
                        <td>{cotacao.valor_total ? Number(cotacao.valor_total).toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) : "R$ 0,00"}</td>
                        <td>{cotacao.observacoes || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
