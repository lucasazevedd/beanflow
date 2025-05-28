import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CriarCliente from "./pages/criar-cliente";
import ListaClientes from "./pages/clientes";
import ListaCotacoes from "./pages/cotacoes";
import CriarCotacao from "./pages/criar-cotacao";
import Login from "./pages/login";
import EditarCotacao from "./pages/editar-cotacao";
import CriarBoleto from "./pages/criar-boleto";
import CriarTarefa from "./pages/criar-tarefas";
import Configuracoes from "./pages/configuracoes";
import ListaTarefas from "./pages/tarefas";
import Boletos from "./pages/boletos";
import EditarBoleto from "./pages/editar-boleto";
import EditarTarefa from "./pages/editar-tarefas";
import EditarCliente from "./pages/editar-clientes";
import RotaPrivada from "./components/rota-privada";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RotaPrivada><Home /></RotaPrivada>} />
        <Route path="/clientes" element={<RotaPrivada><ListaClientes /></RotaPrivada>} />
        <Route path="/clientes/novo" element={<RotaPrivada><CriarCliente /></RotaPrivada>} />
        <Route path="/cotacoes" element={<RotaPrivada><ListaCotacoes /></RotaPrivada>} />
        <Route path="/cotacoes/novo" element={<RotaPrivada><CriarCotacao /></RotaPrivada>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/cotacoes/editar/:id" element={<RotaPrivada><EditarCotacao /></RotaPrivada>} />
        <Route path="/boletos/novo" element={<RotaPrivada><CriarBoleto /></RotaPrivada>} />
        <Route path="/tarefas/novo" element={<RotaPrivada><CriarTarefa /></RotaPrivada>} />
        <Route path="/configuracoes" element={<RotaPrivada><Configuracoes /></RotaPrivada>} />
        <Route path="/tarefas" element={<RotaPrivada><ListaTarefas /></RotaPrivada>} />
        <Route path="/boletos" element={<RotaPrivada><Boletos /></RotaPrivada>} />
        <Route path="/boletos/editar/:id" element={<RotaPrivada><EditarBoleto /></RotaPrivada>} />
        <Route path="/tarefas/editar/:id" element={<RotaPrivada><EditarTarefa /></RotaPrivada>} />
        <Route path="/clientes/editar/:id" element={<RotaPrivada><EditarCliente /></RotaPrivada>} />
      </Routes>
    </BrowserRouter>
  );
}
