import "../../styles/components/tabela-base.css";
import { Cliente } from "../../types/Cliente";
import { Cotacao } from "../../types/Cotacao";

interface TabelaClientesProps {
  clientes: Cliente[];
  cotacoes: Cotacao[];
  loading: boolean;
}

export default function TabelaClientes({ clientes, cotacoes, loading }: TabelaClientesProps) {
  // Retorna a data do último pedido de um cliente, ou "-" se não houver
  const getUltimoPedido = (clienteId: number): string => {
    const cotacoesCliente = cotacoes
      .filter(c => c.cliente_id === clienteId)
      .sort((a, b) => new Date(b.data_criacao).getTime() - new Date(a.data_criacao).getTime());

    return cotacoesCliente.length > 0
      ? new Date(cotacoesCliente[0].data_criacao).toLocaleDateString()
      : "-";
  };

  return (
    <div className="tabela-wrapper">
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Razão Social</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Último Pedido</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={7}>Carregando...</td></tr>
          ) : clientes.length === 0 ? (
            <tr><td colSpan={7}>Nenhum cliente encontrado</td></tr>
          ) : (
            clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cnpj}</td>
                <td>{cliente.razaoSocial}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{getUltimoPedido(cliente.id)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
