import { Sidebar } from "../components/sidebar";
// import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useNavigate } from "react-router-dom";

import "../styles/pages/criar-pages.css";

export default function Configuracoes() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmar = window.confirm("Deseja realmente sair da conta?");
    if (!confirmar) return;

    localStorage.removeItem("token"); // 🔁 remove o token JWT
    navigate("/login");
  };

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
                <input type="text" value="admin.beanflow.2025" disabled />
              </div>

              <button className="logoff" type="button" onClick={handleLogout}>
                Sair da Conta
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}