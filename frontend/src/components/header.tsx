import SearchIcon from "../assets/icons/search-icon";
import NotificationsIcon from "../assets/icons/notifications-icon";

import "../styles/header.css";

export function Header() {
  return (
    <header className="header">
        <div className="header-left">
          <span className="greeting">Olá, Jairo Marinho 👋</span>
        </div>
        <div className="header-right">
            <button className="icon-button" aria-label="Pesquisar">
                <SearchIcon className="header-icons" />
            </button>
            <button className="icon-button" aria-label="Notificações">
                <NotificationsIcon className="header-icons"/>
            </button>
            <span className="date">📅 segunda-feira, 31 de março</span>
        </div>
    </header>
  );
}
