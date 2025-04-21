import FileIcon from "../assets/icons/file-icon";
import ClientsIcon from "../assets/icons/clients-icon";
import CheckIcon from "../assets/icons/check-icon";
import PaymentIcon from "../assets/icons/payment-icon";
import LogoIcon from "../assets/icons/bean-flow-logo";
import SettingsIcon from "../assets/icons/settings-icon";

import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export function Sidebar() {
  console.log("Sidebar renderizou");
  return (
    <aside className="sidebar">
      <div className="top">
        <Link to="/"><LogoIcon className="logo"/></Link>
        <span className="logo-text">BeanFlow</span>
      </div>

      <nav className="menu">
        <Link to=""><FileIcon className='sidebar-icons'/></Link>
        <Link to=""><PaymentIcon className='sidebar-icons'/></Link>
        <Link to=""><CheckIcon className='sidebar-icons'/></Link>
        <Link to="/clientes"><ClientsIcon className='sidebar-icons'/></Link>
      </nav>

      <div className="bottom">
        <Link to=""><SettingsIcon className='sidebar-icons'/></Link>
      </div>
    </aside>
  )
}
