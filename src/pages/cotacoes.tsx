import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
// import { Header } from "../components/header";
import { Footer } from "../components/footer";

import SearchBar from "../components/search-bar";
import BotaoFiltro from "../components/filters";
import BotaoNovo from "../components/botao-novo";
import { getCotacoes } from "../services/quoteService";

import "../styles/pages/lista-pages.css";

interface Cotacao {
  id: number;
  cliente: string;
  data: string;
  status: string;
  etapa: string;
  valor: string;
  observacoes: string;
}


export default function ListaCotacoes() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");


  useEffect(() => {
    async function carregarCotacoes() {
      try {
        const data = await getCotacoes();
        setCotacoes(data);
      } catch (error) {
        console.error("Erro ao carregar cotações:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarCotacoes();
  }, []);

  const cotacoesFiltradas = cotacoes.filter((cotacao) =>
    cotacao.cliente?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cotacao.status?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cotacao.etapa?.toLowerCase().includes(termoBusca.toLowerCase())
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
                ) : cotacoes.length === 0 ? (
                  <tr><td colSpan={7}>Nenhuma cotação encontrada</td></tr>
                ) : (
                  cotacoesFiltradas.map((cotacao) => (
                    <tr key={cotacao.id}>
                      <td>{cotacao.id}</td>
                      <td>{cotacao.cliente}</td>
                      <td>{new Date(cotacao.data).toLocaleDateString()}</td>
                      <td>{cotacao.status}</td>
                      <td>{cotacao.etapa}</td>
                      <td>{cotacao["valor"] || "R$ 0,00"}</td>
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
