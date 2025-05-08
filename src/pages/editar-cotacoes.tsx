import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../services/api";
import "../styles/pages/editar-cotacoes.css";

interface Etapa {
  nome: string;
  concluida: boolean;
  ordem: number;
}

interface Cotacao {
  id: number;
  cliente_id: number;
  valor_total: number;
  data_criacao: string;
  status: string;
  etapa: string;
  observacoes: string;
}

interface Cliente {
  id: number;
  nome: string;
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
  const [clienteNome, setClienteNome] = useState<string>("");
  const [etapas, setEtapas] = useState<Etapa[]>(etapasFixas);

  useEffect(() => {
    async function fetchCotacao() {
      try {
        const response = await fetch(`${API_BASE_URL}/cotacoes/${id}`);
        const data: Cotacao = await response.json();
        setCotacao(data);

        const ordemAtual = etapasFixas.findIndex((e) => e.nome === data.etapa);
        const atualizadas = etapasFixas.map((etapa, i) => ({
          ...etapa,
          concluida: i <= ordemAtual,
        }));
        setEtapas(atualizadas);

        const clienteRes = await fetch(`${API_BASE_URL}/clientes/${data.cliente_id}`);
        const cliente: Cliente = await clienteRes.json();
        setClienteNome(cliente.nome);
      } catch (err) {
        console.error("Erro ao carregar cotação ou cliente:", err);
      }
    }

    fetchCotacao();
  }, [id]);

  async function handleEtapaClick(index: number) {
    if (!cotacao) return;

    const etapaSelecionada = etapas[index];
    if (etapaSelecionada.concluida || (index > 0 && !etapas[index - 1].concluida)) return;

    try {
      await fetch(`${API_BASE_URL}/cotacoes/${cotacao.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etapa: etapaSelecionada.nome }),
      });

      const novasEtapas = etapas.map((etapa, i) =>
        i <= index ? { ...etapa, concluida: true } : etapa
      );
      setEtapas(novasEtapas);
      setCotacao({ ...cotacao, etapa: etapaSelecionada.nome });
    } catch (error) {
      console.error("Erro ao atualizar etapa:", error);
    }
  }

  async function handleSalvarObservacoes() {
    if (!cotacao) return;
    try {
      await fetch(`${API_BASE_URL}/cotacoes/${cotacao.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ observacoes: cotacao.observacoes }),
      });
    } catch (error) {
      console.error("Erro ao salvar observações:", error);
    }
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="editar-cotacao-container">
            <div className="etapas-lateral">
              {etapas.map((etapa, i) => (
                <div
                  key={i}
                  className={`etapa-item ${etapa.concluida ? "concluida" : ""}`}
                  onClick={() => handleEtapaClick(i)}
                >
                  <span className="numero">{etapa.concluida ? "✓" : i + 1}</span>
                  <span className="titulo">{etapa.nome}</span>
                </div>
              ))}
            </div>

            <div className="detalhes-cotacao">
              <h2>PEDIDO Nº {cotacao?.id ?? "_"}</h2>
              <p><strong>Cliente:</strong> {clienteNome}</p>
              <p><strong>Data:</strong> {cotacao?.data_criacao}</p>
              <p><strong>Valor:</strong> {cotacao?.valor_total?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
              <p><strong>Status:</strong> {cotacao?.status}</p>

              <textarea
                value={cotacao?.observacoes || ""}
                onChange={(e) =>
                  setCotacao((prev) => prev ? { ...prev, observacoes: e.target.value } : null)
                }
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
