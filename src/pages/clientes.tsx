import { Sidebar } from "../components/sidebar";
// import { Header } from "../components/header";
import { Footer } from "../components/footer";

import SearchBar from "../components/search-bar";
import BotaoFiltro from "../components/filters";
import BotaoNovo from "../components/botao-novo";
import TabelaClientes from "../components/tabela-clientes";

import { useEffect, useState } from "react";
import { getClientes } from "../services/clientService";
import { getCotacoes } from "../services/quoteService";

interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  razaoSocial: string;
  email: string;
  telefone: string;
}

interface Cotacao {
  cliente_id: number;
  data_criacao: string;
}

import "../styles/pages/lista-pages.css";

export default function ListaClientes() {
  
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cliente.cnpj.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cliente.razaoSocial?.toLowerCase().includes(termoBusca.toLowerCase())
  );
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [clientesData, cotacoesData] = await Promise.all([
          getClientes(),
          getCotacoes()
        ]);
        setClientes(clientesData);
        setCotacoes(cotacoesData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }
  
    carregarDados();
  }, []);

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
                <BotaoNovo rota="/clientes/novo" texto="NOVO CLIENTE" />
              </div>
            </div>
            <TabelaClientes clientes={clientesFiltrados} cotacoes={cotacoes} loading={loading} />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
