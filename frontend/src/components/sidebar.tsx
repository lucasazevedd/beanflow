import { ReactComponent as FileIcon } from '../assets/icons/file-icon.svg?react'
import { ReactComponent as PaymentIcon } from '../assets/icons/credit-card.svg?react'
import { ReactComponent as CheckIcon } from '../assets/icons/check-icon.svg?react'
import { ReactComponent as SettingsIcon } from '../assets/icons/settings-icon.svg?react'
import { ReactComponent as LogoIcon } from '../assets/icons/bean-logo.svg?react'

import "../styles/sidebar.css";

export function Sidebar() {
  console.log("Sidebar renderizou");
  return (
    <aside className="sidebar">
      <div className="top">
        <LogoIcon className="logo" width={32} height={32} />
        <span className="logo-text">BeanFlow</span>
      </div>

      <nav className="menu">
        <button><FileIcon className='sidebar-icons' width={40} height={40}/> Cotações</button>
        <button><PaymentIcon className='sidebar-icons' width={24} height={24}/> Boletos</button>
        <button><CheckIcon className='sidebar-icons' width={24} height={24}/> Tarefas</button>
      </nav>

      <div className="bottom">
        <button><SettingsIcon className='sidebar-icons'/> Config</button>
      </div>
    </aside>
  )
}
