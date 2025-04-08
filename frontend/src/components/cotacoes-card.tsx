import AddNewIcon from "../assets/icons/add-new-icon";
import RightArrowIcon from "../assets/icons/right-arrow-icon";

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
        },
        {
          cliente: "QUINTAS DO CALHAU",
          status: "Faturar pedido",
        },
        {
          cliente: "QUINTAS DO CALHAU",
          status: "Faturar pedido",
        }
      ];
      

  return (
    <div className="cotacoes-card">
      <button className='add-cotacao'>
        <AddNewIcon className="add-new-icon" />
        NOVO ORÇAMENTO
      </button>
      <ul>
        {cotacoes.slice(0, 7).map((item, index) => (
            <li key={index}>
                <div className='linha-lateral'></div>
                <div className='conteudo'>
                    <span className='cliente'>{item.cliente}</span>
                    <span className='status'>{item.status}</span>
                </div>
            </li>
        ))}
      </ul>
      <button className="ver-todas">
        <span>ver todas</span>
        <RightArrowIcon className="right-arrow-icon"/>
      </button>
    </div>
  );
};

export default CotacoesCard;
