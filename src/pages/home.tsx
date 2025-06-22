import { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import CotacoesCard from "../components/widgets/cotacoes-card";
import BoletosCard from "../components/widgets/boletos-card";
import TarefasCard from "../components/widgets/tarefas-card";
import SupersetCard from "../components/widgets/superset-card";

import "../styles/pages/home.css";

export default function Home() {
  const [sidebarAberto, setSidebarAberto] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
      <Sidebar
        aberto={sidebarAberto}
        onFechar={() => setSidebarAberto(false)}
        sidebarRef={sidebarRef}
      />
      <button
        className={`botao-menu-mobile ${sidebarAberto ? "oculto" : ""}`}
        onClick={() => setSidebarAberto(true)}
      >
        ☰
      </button>


      <div className="main">
        <div className="content">
          <div className="grid-container">
            <div className="cotacoes-card">
              <CotacoesCard />
            </div>
            <div className="boletos-card">
              <BoletosCard />
            </div>
            <div className="tarefas-card">
              <TarefasCard />
            </div>
            <div className="status-card">
              <SupersetCard />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}