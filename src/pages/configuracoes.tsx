import { Sidebar } from "../components/sidebar";
// import { Header } from "../components/header";
import { Footer } from "../components/footer";

import "../styles/pages/criar-pages.css";

export default function Configuracoes() {
  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          {/* <Header /> */}
          <div className="criar-form-wrapper">
            <form className="criar-form">
              <h2>CONFIGURAÇÕES</h2>

              <div className="grupo">
                <label>Usuário</label>
                <input type="text" value="usuarioteste@email.com" disabled />
              </div>

              <button className="logoff" type="button">Sair da Conta</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
