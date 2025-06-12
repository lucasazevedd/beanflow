import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import BoletosAbertos from "../components/boletos-abertos";
import SupersetEmbed from "../components/superset-embed";

import "../styles/pages/lista-pages.css"; // estrutura de botões e topo

export default function Boletos() {
  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="grid-container">
            <div className="boletos-abertos">
              <BoletosAbertos />
            </div>
            <div className="boletos-dashboard" id="widget-embed">
              <SupersetEmbed dashboardId="4592ef53-60c2-4ba0-859b-ee2a9cb7ce6b" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
