import "../../styles/components/widgets-card.css";

export default function SupersetCard() {
  return (
    <div className="widget-card">
      <div className="widget-embed">
        <iframe
          title="Clientes Inativos do Mês"
          src="https://beanflow-superset.onrender.com/superset/explore/p/5M8oEbQOGVx/?standalone=1&height=400"
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "var(--border-radius)" }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
