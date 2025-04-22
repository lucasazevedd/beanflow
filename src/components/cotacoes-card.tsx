import AddNewIcon from "../assets/icons/add-new-icon";
import RightArrowIcon from "../assets/icons/right-arrow-icon";
import { statusCotacoes } from "../constants/statusCotacoes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../styles/cotacoes-card.css';

interface Cotacao {
  cliente: string;
  status: string;
}

const CotacoesCard = () => {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCotacoes() {
      try {
        const response = await fetch("https://nodejs-production-382b.up.railway.app/cotacoes");
        if (!response.ok) throw new Error("Erro ao buscar cotações");

        const data = await response.json();
        setCotacoes(data.slice(0, 5)); // mostra no máximo 5
      } catch (error) {
        console.error("Erro ao carregar cotações:", error);
      }
    }

    fetchCotacoes();
  }, []);

  return (
    <div className="cotacoes-card">
      <button className="add-cotacao">
        <AddNewIcon className="add-new-icon" onClick={() => navigate("/cotacoes/novo")}/>
        NOVO ORÇAMENTO
      </button>

      <ul>
        {cotacoes.map((item, index) => (
          <li key={index}>
            <div className="linha-lateral"></div>
            <div className="conteudo">
              <span className="cliente">{item.cliente}</span>
              <span className="etapas">{statusCotacoes(item.status)}</span>
            </div>
          </li>
        ))}
      </ul>

      <button className="ver-todas">
        <span>➡️ VER TODAS AS COTAÇÕES</span>
        <RightArrowIcon className="right-arrow-icon" />
      </button>
    </div>
  );
};

export default CotacoesCard;
