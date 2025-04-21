import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

import SearchBar from "../components/search-bar";
import BotaoFiltro from "../components/filters";
import BotaoNovoCliente from "../components/add-new-client";
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

import "../styles/clientes.css";

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    getClientes()
      .then(setClientes)
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <Header />

          <div className="lista-clientes-container">
            <div className="top-bar-clientes">
              <SearchBar />
              <div className="botoes-clientes">
                <BotaoFiltro />
                <BotaoNovoCliente />
              </div>
            </div>

            {/* 👉 Agora passando os dados pro componente da tabela */}
            <TabelaClientes clientes={clientes} />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
