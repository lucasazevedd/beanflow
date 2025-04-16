import RightArrowIcon from "../assets/icons/right-arrow-icon";

import "../styles/boletos-card.css";

const BoletosCard = () => {
  const boletos = [
    { cliente: "CONDOMÍNIO EDIFÍCIO VANCOUVER", valor: "R$ 1.120,00", vencimento: "vence em 10 dias", status: "ok" },
    { cliente: "SMARTFIT VINHAIS", valor: "R$ 420,00", vencimento: "vence hoje", status: "atencao" },
    { cliente: "CONDOMÍNIO PORTAL DA LAGOA", valor: "R$ 980,00", vencimento: "vence em 2 dias", status: "alerta" },
  ];

  return (
    <div className="boletos-card">
      <div className="boletos-header">
        <span className="titulo">⏳ Boletos próximos do vencimento</span>
      </div>

      <ul className="boletos-lista">
        {boletos.map((boleto, index) => (
          <li key={index} className={`boleto-item ${boleto.status}`}>
            <div className="boleto-info">
              <span className="cliente">{boleto.cliente}</span>
              <span className="valor">{boleto.valor}</span>
            </div>
            <span className="vencimento">{boleto.vencimento}</span>
          </li>
        ))}
      </ul>

      <button className="ver-todas">
        <span>ver todos</span>
        <RightArrowIcon className="right-arrow-icon"/>
      </button>
    </div>
  );
};

export default BoletosCard;
