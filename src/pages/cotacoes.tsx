import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import SearchBar from "../components/search-bar";
import BotaoNovo from "../components/botao-novo";
import { getCotacoes } from "../services/quoteService";
import { getClientes } from "../services/clientService";
import { getNomeClientePorId } from "../utils/clientes";
import { Cliente } from "../types/Cliente";
import { Cotacao } from "../types/Cotacao";

import "../styles/pages/lista-pages.css";
import "../styles/components/tabela-base.css";

export default function ListaCotacoes() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();

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

            <div className="tabela-wrapper">
              <table className="tabela">
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
                      <tr
                        key={cotacao.id}
                        className="linha-clicavel"
                        onClick={() => navigate(`/cotacoes/editar/${cotacao.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{cotacao.id}</td>
                        <td>{getNomeClientePorId(clientes, cotacao.cliente_id)}</td>
                        <td>{new Date(cotacao.data_criacao).toLocaleDateString()}</td>
                        <td>{cotacao.status}</td>
                        <td>{cotacao.etapa}</td>
                        <td>
                          {cotacao.valor_total
                            ? cotacao.valor_total.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })
                            : "R$ 0,00"}
                        </td>
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
