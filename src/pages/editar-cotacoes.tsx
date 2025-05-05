import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useParams } from "react-router-dom";
import "../styles/pages/editar-cotacoes.css";

interface Etapa {
  nome: string;
  concluida: boolean;
  ordem: number;
}

interface Cotacao {
  id: number;
  cliente: string;
  data: string;
  valor: number;
  status: string;
  etapa: string;
  observacoes: string;
}

const etapasFixas: Etapa[] = [
  { nome: "REALIZAR ORÇAMENTO", concluida: false, ordem: 1 },
  { nome: "AJUSTAR PREÇO", concluida: false, ordem: 2 },
  { nome: "ENVIAR COTAÇÃO", concluida: false, ordem: 3 },
  { nome: "APROVAÇÃO DO ORÇAMENTO", concluida: false, ordem: 4 },
  { nome: "FATURAR PEDIDO", concluida: false, ordem: 5 },
  { nome: "PAGAMENTO", concluida: false, ordem: 6 },
  { nome: "ENTREGA DO MATERIAL", concluida: false, ordem: 7 },
];

export default function EditarCotacao() {
  const { id } = useParams();
  const [cotacao, setCotacao] = useState<Cotacao | null>(null);
  const [etapas, setEtapas] = useState<Etapa[]>(etapasFixas);

  useEffect(() => {
    async function fetchCotacao() {
      const response = await fetch(`/api/cotacoes/${id}`);
      const data = await response.json();
      setCotacao(data);

      const etapasConcluidas = data.etapas_concluidas; // supondo que vem do backend
      const novasEtapas = etapasFixas.map((etapa, index) => ({
        ...etapa,
        concluida: index < etapasConcluidas.length,
      }));
      setEtapas(novasEtapas);
    }

    fetchCotacao();
  }, [id]);

  function handleEtapaClick(index: number) {
    if (!etapas[index].concluida && (index === 0 || etapas[index - 1].concluida)) {
      const novaEtapa = etapas[index].nome;
      fetch(`/api/etapas-cotacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cotacao_id: id, etapa: novaEtapa, responsavel: "Usuário X" })
      });

      const novasEtapas = etapas.map((etapa, i) =>
        i <= index ? { ...etapa, concluida: true } : etapa
      );
      setEtapas(novasEtapas);
    }
  }

  function handleSalvarObservacoes() {
    fetch(`/api/cotacoes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ observacoes: cotacao?.observacoes }),
    });
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <Header />

          <div className="editar-cotacao-container">
            <div className="etapas-lateral">
              {etapas.map((etapa, i) => (
                <div
                  key={i}
                  className={`etapa-item ${etapa.concluida ? "concluida" : ""}`}
                  onClick={() => handleEtapaClick(i)}
                >
                  <span className="numero">{i + 1}</span>
                  <span className="titulo">{etapa.nome}</span>
                </div>
              ))}
            </div>

            <div className="detalhes-cotacao">
              <h2>PEDIDO_Nº_{cotacao?.id}</h2>
              <p><strong>Cliente:</strong> {cotacao?.cliente}</p>
              <p><strong>Data:</strong> {cotacao?.data}</p>
              <p><strong>Valor:</strong> R$ {cotacao?.valor.toLocaleString("pt-BR")}</p>
              <p><strong>Status:</strong> {cotacao?.status}</p>
              <textarea
                value={cotacao?.observacoes || ""}
                onChange={(e) => setCotacao((prev) => prev ? { ...prev, observacoes: e.target.value } : null)}
                placeholder="Observações"
              />
              <button onClick={handleSalvarObservacoes}>Salvar</button>
            </div>

          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
