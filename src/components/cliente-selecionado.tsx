// components/cliente-selecionado.tsx
import { Cliente } from "../types/Cliente";

interface Props {
  cliente: Cliente | null;
}

export default function ClienteSelecionado({ cliente }: Props) {
  if (!cliente) return null;

  return (
    <div className="grupo grupo-cliente">
      <label>Cliente</label>
      <input
        type="text"
        value={`${cliente.nome} – ${cliente.cnpj}`}
        readOnly
      />
    </div>
  );
}
