import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

import SearchBar from "../components/search-bar";
import BotaoFiltro from "../components/filters";
import BotaoNovaCotacao from "../components/add-new-quote";

import { getCotacoes } from "../services/quoteService";

import "../styles/cotacoes.css";

interface Cotacao {
  id: number;
  cliente: string;
  data: string;
  status: string;
  etapa: string;
  ultima_atualizacao: string;
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
    cotacao.cliente.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cotacao.status.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cotacao.etapa.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <Header />

          <div className="lista-cotacoes-container">
            <div className="top-bar-cotacoes">
              <SearchBar onSearch={setTermoBusca} />
              <div className="botoes-cotacoes">
                <BotaoFiltro />
                <BotaoNovaCotacao />
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
                    <th>Próxima Etapa</th>
                    <th>Última Atualização</th>
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
                        <td>{cotacao.data}</td>
                        <td>{cotacao.status}</td>
                        <td>{cotacao.etapa}</td>
                        <td>{new Date(cotacao.ultima_atualizacao).toLocaleDateString()}</td>
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
