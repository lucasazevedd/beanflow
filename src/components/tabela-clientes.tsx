import "../styles/components/tabela-clientes.css";

interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  razaoSocial?: string;
  telefone: string;
  email: string;
  ultimoPedido?: string;
}

interface TabelaClientesProps {
  clientes: Cliente[];
  cotacoes: Cotacao[];
  loading: boolean;
}

interface Cotacao {
  cliente_id: number;
  data_criacao: string;
}

export default function TabelaClientes({ clientes, cotacoes , loading }: TabelaClientesProps) {

  const getUltimoPedido = (clienteId: number): string => {
    const cotacoesCliente = cotacoes
      .filter(c => c.cliente_id === clienteId)
      .sort((a, b) => new Date(b.data_criacao).getTime() - new Date(a.data_criacao).getTime());
  
    if (cotacoesCliente.length === 0) return "-";
    return new Date(cotacoesCliente[0].data_criacao).toLocaleDateString();
  };
  

  return (
    <div className="tabela-clientes-wrapper">
      <table className="tabela-clientes">
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
            <tr>
              <td colSpan={7}>Carregando...</td>
            </tr>
          ) : clientes.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhum cliente encontrado</td>
            </tr>
          ) : (
            clientes.map((cliente, index) => (
              <tr key={index}>
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
