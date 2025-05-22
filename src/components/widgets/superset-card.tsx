import "../../styles/components/widgets-card.css";

export default function SupersetCard() {
  return (
    <div className="widget-card">
      <div className="widget-header">
        <span className="widget-title">DASHBOARD</span>
      </div>

      <div className="widget-embed">
        {/* Substitua esse iframe pelo código embed oficial do Superset */}
        <iframe
          title="Gráfico Superset"
          src="https://seu-superset-url.com/embed/gráfico-id"
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "var(--border-radius)" }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
