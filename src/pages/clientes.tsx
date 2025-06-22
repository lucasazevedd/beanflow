import { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import SearchBar from "../components/search-bar";
import BotaoNovo from "../components/botao-novo";
import TabelaClientes from "../components/tabelas/tabela-clientes";
import { Cliente } from "../types/Cliente";
import { Cotacao } from "../types/Cotacao";
import { getClientes } from "../services/clientService";
import { getCotacoes } from "../services/quoteService";

import "../styles/pages/lista-pages.css";

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [loading, setLoading] = useState(true);

  const [sidebarAberto, setSidebarAberto] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        sidebarAberto &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [sidebarAberto]);

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cliente.cnpj.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cliente.razao_social?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="home">
      {/* Botão de abrir sidebar no mobile */}
      <button
        className={`botao-menu-mobile ${sidebarAberto ? "oculto" : ""}`}
        onClick={() => setSidebarAberto(true)}
      >
        ☰
      </button>

      <Sidebar
        aberto={sidebarAberto}
        onFechar={() => setSidebarAberto(false)}
        sidebarRef={sidebarRef}
      />

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

            <BotaoNovo
              rota="/clientes/novo"
              texto="NOVO CLIENTE"
              className="botao-novo-mobile"
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}