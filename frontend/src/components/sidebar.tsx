import FileIcon from "../assets/icons/file-icon";
import ClientsIcon from "../assets/icons/clients-icon";
import CheckIcon from "../assets/icons/check-icon";
import PaymentIcon from "../assets/icons/payment-icon";
import LogoIcon from "../assets/icons/bean-flow-logo";
import SettingsIcon from "../assets/icons/settings-icon";

import "../styles/sidebar.css";

export function Sidebar() {
  console.log("Sidebar renderizou");
  return (
    <aside className="sidebar">
      <div className="top">
        <LogoIcon className="logo"/>
        <span className="logo-text">BeanFlow</span>
      </div>

      <nav className="menu">
        <button><FileIcon className='sidebar-icons'/></button>
        <button><PaymentIcon className='sidebar-icons'/></button>
        <button><CheckIcon className='sidebar-icons'/></button>
        <button><ClientsIcon className='sidebar-icons'/></button>
      </nav>

      <div className="bottom">
        <button><SettingsIcon className='sidebar-icons'/></button>
      </div>
    </aside>
  )
}
