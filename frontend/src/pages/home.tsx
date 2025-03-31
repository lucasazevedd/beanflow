import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";

import "../styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="content">
        <Header />
        {/* outros conteúdos aqui */}
      </div>
    </div>
  );
}

