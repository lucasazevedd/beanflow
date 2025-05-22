import { useState, useEffect } from "react";
import { Cliente } from "../types/Cliente";
import { getClientes } from "../services/clientService";

interface Props {
  clienteSelecionado: Cliente | null;
  setClienteSelecionado: (cliente: Cliente | null) => void;
}

export default function CampoClienteSelecionavel({ clienteSelecionado, setClienteSelecionado }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getClientes().then(setClientes);
  }, []);

  const handleSelecao = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setBusca(`${cliente.nome} – ${cliente.cnpj}`);
  };

  return (
    <div className="grupo grupo-cliente">
      <label htmlFor="cliente">Cliente<span>*</span></label>
      <div className="grupo">
        <input
          type="text"
          id="cliente"
          placeholder="Digite um nome ou CNPJ..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setClienteSelecionado(null);
          }}
          disabled={!!clienteSelecionado}
          required
        />
        {clienteSelecionado && (
          <button type="button" className="limpar-cliente" onClick={() => {
            setClienteSelecionado(null);
            setBusca("");
          }}>
            limpar seleção
          </button>
        )}
      </div>

      {busca && !clienteSelecionado && (
        <ul className="sugestoes-clientes">
          {clientes
            .filter(c =>
              c.nome.toLowerCase().includes(busca.toLowerCase()) || c.cnpj.includes(busca)
            )
            .slice(0, 5)
            .map(cliente => (
              <li key={cliente.id} onClick={() => handleSelecao(cliente)}>
                {cliente.nome} | {cliente.cnpj}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
