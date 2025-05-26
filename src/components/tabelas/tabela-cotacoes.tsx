import { useNavigate } from "react-router-dom";
import "../../styles/components/tabela-base.css";
import { Cotacao } from "../../types/Cotacao";
import { Cliente } from "../../types/Cliente";
import { getNomeClientePorId } from "../../utils/clientes";

interface TabelaCotacoesProps {
  cotacoes: Cotacao[];
  clientes: Cliente[];
  loading: boolean;
}

export default function TabelaCotacoes({ cotacoes, clientes, loading }: TabelaCotacoesProps) {
  const navigate = useNavigate();

  return (
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
            <tr><td colSpan={6}>Carregando...</td></tr>
          ) : cotacoes.length === 0 ? (
            <tr><td colSpan={6}>Nenhuma cotação encontrada</td></tr>
          ) : (
            cotacoes.map((cotacao) => (
              <tr 
                key={cotacao.id}
                className="linha-clicavel"
                onClick={() => navigate(`/cotacoes/editar/${cotacao.id}`)}
              >
                <td>{cotacao.id}</td>
                <td>{getNomeClientePorId(clientes, cotacao.cliente_id)}</td>
                <td>{new Date(cotacao.data_criacao).toLocaleDateString()}</td>
                <td>{cotacao.status}</td>
                <td>{cotacao.etapa}</td>
                <td>R${cotacao.valor_total}</td>
                <td>{cotacao.observacoes || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
