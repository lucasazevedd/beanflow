import "../../styles/components/widgets-card.css";
import SupersetEmbed from "../superset-embed";

export default function SupersetCard() {
  return (
    <div className="widget-card">
      <div className="widget-embed">
        <SupersetEmbed dashboardId="11762471-ca60-4004-810a-40a8d42ad334"/>
      </div>
    </div>
  );
}
