import { Sidebar } from "../components/sidebar";
// import { Header } from "../components/header";
import { Footer } from "../components/footer";

import SearchBar from "../components/search-bar";
import BotaoFiltro from "../components/filters";
import BotaoNovo from "../components/botao-novo";
import TabelaClientes from "../components/tabela-clientes";

import { useEffect, useState } from "react";
import { getClientes } from "../services/clientService";

interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  razaoSocial: string;
  email: string;
  telefone: string;
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

  useEffect(() => {
    async function carregarClientes() {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    }
  
    carregarClientes();
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

            {/* 👉 Agora passando os dados pro componente da tabela */}
            <TabelaClientes clientes={clientesFiltrados} loading={loading} />

          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
