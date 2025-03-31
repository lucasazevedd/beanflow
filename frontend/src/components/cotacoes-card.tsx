import '../styles/cotacoes-card.css';

const CotacoesCard = () => {
    const cotacoes = [
        {
          cliente: "CONDOMÍNIO PORTAL DA LAGOA",
          status: "Realizar orçamento",
        },
        {
          cliente: "CONDOMÍNIO YÁGUA",
          status: "Ajustar Preço",
        },
        {
          cliente: "RSA EMPREENDIMENTOS",
          status: "Enviar cotação",
        },
        {
          cliente: "EDIFÍCIO VANCOUVER",
          status: "Aprovação do Orçamento",
        },
        {
          cliente: "QUINTAS DO CALHAU",
          status: "Faturar pedido",
        }
      ];
      

  return (
    <div className="cotacoes-card">
      <ul>
        {cotacoes.slice(0, 5).map((item, index) => (
            <li key={index}>
                <span>{item.cliente}</span>
                <span>{item.status}</span>
            </li>
        ))}
      </ul>
      <button className="ver-todas">Ver todas</button>
    </div>
  );
};

export default CotacoesCard;
