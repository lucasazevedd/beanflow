import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import CotacoesCard from "../components/cotacoes-card";
import BoletosCard from "../components/boletos-card";
import TarefasCard from "../components/tarefas-card";

import "../styles/home.css";



export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <Header />
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
            <div className="status-card">STATUS GERAL</div>
          </div>
        </div>
        <Footer />
    </div>
      </div>
      
  );
}

