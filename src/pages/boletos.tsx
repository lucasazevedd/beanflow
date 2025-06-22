import { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import BoletosAbertos from "../components/boletos-abertos";
import SupersetEmbed from "../components/superset-embed";
import BotaoNovo from "../components/botao-novo";

import "../styles/pages/lista-pages.css";

export default function Boletos() {
  const [sidebarAberto, setSidebarAberto] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        sidebarAberto &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [sidebarAberto]);

  return (
    <div className="home">
      {/* Botão de abrir sidebar no mobile */}
      <button
        className={`botao-menu-mobile ${sidebarAberto ? "oculto" : ""}`}
        onClick={() => setSidebarAberto(true)}
      >
        ☰
      </button>

      <Sidebar
        aberto={sidebarAberto}
        onFechar={() => setSidebarAberto(false)}
        sidebarRef={sidebarRef}
      />

      <div className="main">
        <div className="content">
          <div className="grid-container">
            <div className="boletos-abertos">
              <BoletosAbertos />
            </div>
            <div className="boletos-dashboard" id="widget-embed">
              <SupersetEmbed dashboardId="4592ef53-60c2-4ba0-859b-ee2a9cb7ce6b" />
            </div>
            <BotaoNovo
              rota="/boletos/novo"
              texto="NOVO BOLETO"
              className="botao-novo-mobile"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}