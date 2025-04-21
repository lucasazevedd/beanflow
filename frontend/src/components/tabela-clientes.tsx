import "../styles/tabela-clientes.css";

interface Cliente {
  id: number | string;
  nome: string;
  cnpj: string;
  razaoSocial: string;
  telefone: string;
  email: string;
  // Caso você já tenha o campo de último pedido no futuro
  ultimoPedido?: string;
}

interface Props {
  clientes: Cliente[];
}

export default function TabelaClientes({ clientes }: Props) {
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
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.cnpj}</td>
              <td>{cliente.razaoSocial}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.email}</td>
              <td>{cliente.ultimoPedido || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
