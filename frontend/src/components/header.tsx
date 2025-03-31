import SearchIcon from "../assets/icons/search-icon";
import NotificationsIcon from "../assets/icons/notifications-icon";

import "../styles/header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div>
          <span className="greeting">Olá, Jairo Marinho 👋</span>
        </div>
        <div className="header-right">
            <button aria-label="Pesquisar">
                <SearchIcon />
            </button>
            <button className="icon-button" aria-label="Notificações">
                <NotificationsIcon/>
            </button>
            <span className="date">📅 segunda-feira, 31 de março</span>
        </div>
      </div>
    </header>
  );
}
