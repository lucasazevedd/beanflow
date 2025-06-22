import { useEffect, useRef, useState } from "react";
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
  const [sidebarAberto, setSidebarAberto] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

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

  const cotacoesFiltradas = cotacoes.filter((cotacao) =>
    cotacao.status?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cotacao.etapa?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    getNomeClientePorId(clientes, cotacao.cliente_id).toLowerCase().includes(termoBusca.toLowerCase())
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

      {/* Sidebar controlada via props e ref */}
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
                <BotaoNovo rota="/cotacoes/novo" texto="NOVO ORÇAMENTO" />
              </div>
            </div>

            <TabelaCotacoes
              cotacoes={cotacoesFiltradas}
              clientes={clientes}
              loading={loading}
            />
            <BotaoNovo
              rota="/cotacoes/novo"
              texto="NOVO ORÇAMENTO"
              className="botao-novo-mobile"
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}