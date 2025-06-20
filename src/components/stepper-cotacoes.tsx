import "../styles/components/stepper.css";

type Etapa = {
  value: string;
  label: string;
};

type StepperEtapasProps = {
  etapas: Etapa[];
  etapaAtual: string;
  onEtapaChange: (novaEtapa: string) => void;
  disabled?: boolean;
};

export default function StepperEtapas({
  etapas,
  etapaAtual,
  onEtapaChange,
  disabled = false
}: StepperEtapasProps) {
  const indexAtual = etapas.findIndex((etapa) => etapa.value === etapaAtual);

  const etapasVisiveis = etapas.slice(
    indexAtual === 0
      ? 0
      : indexAtual === etapas.length - 1
      ? etapas.length - 3
      : indexAtual - 1,
    indexAtual === 0
      ? 3
      : indexAtual === etapas.length - 1
      ? etapas.length
      : indexAtual + 2
  );

  const handleClick = (novaEtapa: string) => {
    onEtapaChange(novaEtapa); // ✅ Apenas altera o estado no componente pai
  };

  return (
    <div className="stepper-etapas">
      {etapasVisiveis.map((etapa) => {
        const indexGlobal = etapas.findIndex((e) => e.value === etapa.value);
        const concluida = indexGlobal < indexAtual;
        const ativa = indexGlobal === indexAtual;
        const proxima = indexGlobal === indexAtual + 1;

        const podeSelecionar = concluida || ativa || proxima;

        return (
          <button
            type="button"
            key={etapa.value}
            className={`etapa ${concluida ? "concluida" : ""} ${ativa ? "ativa" : ""}`}
            onClick={() => handleClick(etapa.value)}
            disabled={disabled || !podeSelecionar}
          >
            {etapa.label}
          </button>
        );
      })}
    </div>
  );
}