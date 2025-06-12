import FileIcon from "../assets/icons/file-icon";
import ClientsIcon from "../assets/icons/clients-icon";
import CheckIcon from "../assets/icons/check-icon";
import PaymentIcon from "../assets/icons/payment-icon";
import LogoIcon from "../assets/icons/bean-flow-logo";
import LogoutIcon from "../assets/icons/logout-icon";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/components/sidebar.css";

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmar = window.confirm("Deseja realmente sair da conta?");
    if (!confirmar) return;

    sessionStorage.removeItem("token");
    navigate("/login");
  };

  console.log("Sidebar renderizou");
  return (
    <aside className="sidebar">
      <div className="top">
        <Link to="/"><LogoIcon className="logo"/></Link>
        <span className="logo-text">BeanFlow</span>
      </div>

      <nav className="menu">
        <Link to="/cotacoes"><FileIcon className='sidebar-icons'/></Link>
        <Link to="/boletos"><PaymentIcon className='sidebar-icons'/></Link>
        <Link to="/tarefas"><CheckIcon className='sidebar-icons'/></Link>
        <Link to="/clientes"><ClientsIcon className='sidebar-icons'/></Link>
      </nav>

      <div className="bottom">
        <button className="sidebar-icons" onClick={handleLogout} title="Logout">
          <LogoutIcon />
        </button>
      </div>
    </aside>
  )
}
