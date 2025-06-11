import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import BoletosAbertos from "../components/boletos-abertos";

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
            <div className="boletos-dashboard">
              
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
