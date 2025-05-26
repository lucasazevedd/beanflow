import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RightArrowIcon from "../../assets/icons/right-arrow-icon";
import { getBoletos } from "../../services/boletoService";
import "../../styles/components/widgets-card.css";
import { Boleto } from "../../types/Boleto";
import { getStatusBoleto } from "../../utils/date";
import BotaoNovo from "../../components/botao-novo";
import { getClientes } from "../../services/clientService";
import { Cliente } from "../../types/Cliente";
import { getNomeClientePorId } from "../../utils/clientes";

export default function BoletosCard() {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
  const carregar = async () => {
  try {
    const [boletosData, clientesData] = await Promise.all([
      getBoletos(),
      getClientes()
    ]);

    const proximos = boletosData.filter(
      (b: Boleto) => !b.pago && getStatusBoleto(b.vencimento)
    );

    setBoletos(proximos);
    setClientes(clientesData);
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }
};

  carregar();
}, []);


  return (
    <div className="widget-card">
      <BotaoNovo rota="/boletos/novo" texto="NOVO BOLETO" />
    
      <ul className="widget-lista">
        {boletos.map((boleto) => {
          const status = getStatusBoleto(boleto.vencimento);
          if (!status) return null;

          return (
            <li key={boleto.id} className={`widget-item ${status.classe}`} onClick={() => navigate(`/boletos/editar/${boleto.id}`)}>
              <div className="widget-item-header">
                <span className="widget-cliente">
                  {status.emoji} { getNomeClientePorId(clientes, boleto.cliente_id)}
                </span>
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
