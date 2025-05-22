import { useEffect, useState } from "react";
import RightArrowIcon from "../../assets/icons/right-arrow-icon";
import { getBoletos } from "../../services/boletoService";
import "../../styles/components/widgets-card.css";
import { Boleto } from "../../types/Boleto";
import { getStatusBoleto } from "../../utils/date";

export default function BoletosCard() {
  const [boletos, setBoletos] = useState<Boleto[]>([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await getBoletos();
        const proximos = data.filter((b: Boleto) => !b.pago && getStatusBoleto(b.vencimento));
        setBoletos(proximos);
      } catch (err) {
        console.error("Erro ao carregar boletos:", err);
      }
    };

    carregar();
  }, []);

  return (
    <div className="widget-card">
      <div className="widget-header">
        <span className="widget-title">BOLETOS PRÓXIMOS AO VENCIMENTO</span>
      </div>

      <ul className="widget-list">
        {boletos.map((boleto) => {
          const status = getStatusBoleto(boleto.vencimento);
          if (!status) return null;

          return (
            <li key={boleto.id} className={`widget-item ${status.classe}`}>
              <div className="widget-item-header">
                <span>{status.emoji} {boleto.cliente}</span>
                <span className="widget-status">{status.texto}</span>
              </div>
              <span className="widget-value">
                {Number(boleto.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </span>
            </li>
          );
        })}
      </ul>

      <button className="widget-button" onClick={() => window.location.href = "/boletos"}>
        VER TODOS OS BOLETOS
        <RightArrowIcon />
      </button>
    </div>
  );
}
