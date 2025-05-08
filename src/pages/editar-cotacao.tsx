// pages/editar-cotacao.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import EtapasCotacao from "../components/etapas-cotacao";
import FormularioCotacao from "../components/formulario-cotacao";
import { API_BASE_URL } from "../services/api";

import "../styles/pages/criar-pages.css";
import "../styles/pages/editar-cotacao-grid.css";

export default function EditarCotacao() {
  const { id } = useParams();
  const [cotacao, setCotacao] = useState<any>(null);
  const [clienteNome, setClienteNome] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_BASE_URL}/cotacoes/${id}`);
        const data = await res.json();
        setCotacao(data);

        const clienteRes = await fetch(`${API_BASE_URL}/clientes/${data.cliente_id}`);
        const cliente = await clienteRes.json();
        setClienteNome(cliente.nome);
      } catch (err) {
        console.error("Erro ao carregar cotacao:", err);
      }
    }
    fetchData();
  }, [id]);

  if (!cotacao) return null;

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="editar-cotacao-grid">
            <EtapasCotacao
              etapaAtual={cotacao.etapa}
              cotacaoId={cotacao.id}
              onEtapaChange={(novaEtapa) =>
                setCotacao({ ...cotacao, etapa: novaEtapa })
              }
            />
            <FormularioCotacao
              cotacaoId={cotacao.id}
              etapaAtual={cotacao.etapa}
              onEtapaAtualizar={(novaEtapa) =>
                setCotacao({ ...cotacao, etapa: novaEtapa })
              }
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
