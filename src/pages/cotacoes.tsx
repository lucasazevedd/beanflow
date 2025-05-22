import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import SearchBar from "../components/search-bar";
import BotaoNovo from "../components/botao-novo";
import TabelaCotacoes from "../components/tabelas/tabela-cotacoes";
import { getCotacoes } from "../services/quoteService";
import { getClientes } from "../services/clientService";
import { getNomeClientePorId } from "../utils/clientes";

import { Cliente } from "../types/Cliente";
import { Cotacao } from "../types/Cotacao";

import "../styles/pages/lista-pages.css";

export default function ListaCotacoes() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const [cotacoesData, clientesData] = await Promise.all([
          getCotacoes(),
          getClientes(),
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
    getNomeClientePorId(clientes, cotacao.cliente_id).toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="lista-page-container">
            <div className="top-bar">
              <SearchBar onSearch={setTermoBusca} />
              <div className="botoes">
                <BotaoNovo rota="/cotacoes/novo" texto="NOVO ORÇAMENTO" />
              </div>
            </div>

            <TabelaCotacoes cotacoes={cotacoesFiltradas} clientes={clientes} loading={loading} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
