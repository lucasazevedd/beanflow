import RightArrowIcon from "../assets/icons/right-arrow-icon";
import "../styles/components/boletos-card.css";

const getStatusBoleto = (vencimento: string) => {
  const hoje = new Date();
  const dataVencimento = new Date(vencimento);
  const diffDias = Math.ceil((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDias < 0) return { emoji: "🔴", status: "Vencido", classe: "vencido" };
  if (diffDias === 0) return { emoji: "🔴", status: "Vence hoje", classe: "vermelho" };
  if (diffDias <= 3) return { emoji: "🟠", status: `Vence em ${diffDias} dias`, classe: "laranja" };
  if (diffDias <= 7) return { emoji: "🟡", status: `Vence em ${diffDias} dias`, classe: "amarelo" };
  if (diffDias <= 14) return { emoji: "🟢", status: `Vence em ${diffDias} dias`, classe: "verde" };
  return { emoji: "⚪️", status: `Vence em ${diffDias} dias`, classe: "branco" };
};

const BoletosCard = () => {
  const boletos = [
    { cliente: "CONDOMÍNIO EDIFÍCIO VANCOUVER", valor: "R$ 1.120,00", vencimento: "2025-04-27" },
    { cliente: "SMARTFIT VINHAIS", valor: "R$ 420,00", vencimento: "2025-04-17" },
    { cliente: "CONDOMÍNIO PORTAL DA LAGOA", valor: "R$ 980,00", vencimento: "2025-04-20" },
  ];

  return (
    <div className="boletos-card">
      <div className="boletos-header">
        <span className="titulo">⏳ BOLETOS PRÓXIMOS AO VENCIMENTO</span>
      </div>

      <ul className="boletos-lista">
        {boletos.map((boleto, index) => {
          const { emoji, status, classe } = getStatusBoleto(boleto.vencimento);
          return (
            <li key={index} className={`boleto-item ${classe}`}>
              <div className="boleto-info">
                <span className="cliente">{emoji} {boleto.cliente}</span>
                <span className="status">{status}</span>
              </div>
              <span className="valor">{boleto.valor}</span>
            </li>
          );
        })}
      </ul>

      <button className="ver-todas">
        <span>➡️ VER TODOS OS BOLETOS</span>
        <RightArrowIcon className="right-arrow-icon"/>
      </button>
    </div>
  );
};

export default BoletosCard;
