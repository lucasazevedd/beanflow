import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import SearchBar from "../components/search-bar";
import BotaoNovo from "../components/botao-novo";
import TabelaClientes from "../components/tabelas/tabela-clientes";
import { Cliente } from "../types/Cliente";
import { Cotacao } from "../types/Cotacao";
import { useEffect, useState } from "react";
import { getClientes } from "../services/clientService";
import { getCotacoes } from "../services/quoteService";

import "../styles/pages/lista-pages.css";

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [loading, setLoading] = useState(true);

  // Filtra clientes com base na busca
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cliente.cnpj.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cliente.razaoSocial?.toLowerCase().includes(termoBusca.toLowerCase())
  );

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
          <div className="lista-page-container">
            <div className="top-bar">
              <SearchBar onSearch={setTermoBusca} />
              <div className="botoes">
                <BotaoNovo rota="/clientes/novo" texto="NOVO CLIENTE" />
              </div>
            </div>

            <TabelaClientes
              clientes={clientesFiltrados}
              cotacoes={cotacoes}
              loading={loading}
            />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}