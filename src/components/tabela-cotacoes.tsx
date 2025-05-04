import "../styles/components/tabela-cotacoes.css";

const cotacoes = [
  {
    id: "9999",
    cliente: "Smart Fit Vinhais",
    data: "21/04/2025",
    status: "INFINITY FACILITIES",
    proximaEtapa: "📄 Realizar orçamento",
    ultimaAtualizacao: "21/04/2025",
    observacoes: "Esfregão tem que ser..."
  },
  // Adicione mais cotações conforme necessário
];

export default function TabelaCotacoes() {
  return (
    <div className="tabela-cotacoes-wrapper">
      <table className="tabela-cotacoes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Status</th>
            <th>Próxima Etapa</th>
            <th>Última Atualização</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {cotacoes.map((cotacao, index) => (
            <tr key={index}>
              <td>{cotacao.id}</td>
              <td>{cotacao.cliente}</td>
              <td>{cotacao.data}</td>
              <td>{cotacao.status}</td>
              <td>{cotacao.proximaEtapa}</td>
              <td>{cotacao.ultimaAtualizacao}</td>
              <td>{cotacao.observacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
