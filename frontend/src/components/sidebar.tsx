import { ReactComponent as FileIcon } from '../assets/icons/file-icon.svg'
import { ReactComponent as PaymentIcon } from '../assets/icons/credit-card.svg'
import { ReactComponent as CheckIcon } from '../assets/icons/check-icon.svg'
import { ReactComponent as SettingsIcon } from '../assets/icons/settings-icon.svg'
import { ReactComponent as LogoIcon } from '../assets/icons/bean-logo.svg'

import './sidebar.css'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="top">
        <LogoIcon className="logo" width={32} height={32} />
        <span className="logo-text">BeanFlow</span>
      </div>

      <nav className="menu">
        <button><FileIcon width={20} height={20} /> Cotações</button>
        <button><PaymentIcon width={20} height={20} /> Boletos</button>
        <button><CheckIcon width={20} height={20} /> Tarefas</button>
      </nav>

      <div className="bottom">
        <button><SettingsIcon width={20} height={20} /> Config</button>
      </div>
    </aside>
  )
}
