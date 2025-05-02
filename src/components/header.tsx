// import NotificationsIcon from "../assets/icons/notifications-icon";

import { useEffect, useState } from "react";
import "../styles/header.css";

export function Header() {

  const [dataAtual, setDataAtual] = useState("");

  useEffect(() => {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setDataAtual(dataFormatada);
  }, []);
  return (
    <header className="header">
        <div className="header-left">
          <span className="greeting">Olá, Jairo Marinho 👋</span>
        </div>
        <div className="header-right">
            {/* <button className="icon-button" aria-label="Notificações">
                <NotificationsIcon className="header-icons"/>
            </button> */}
            <span className="date">📅 {dataAtual}</span>
        </div>
    </header>
  );
}
