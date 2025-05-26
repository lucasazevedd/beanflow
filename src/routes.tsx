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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/clientes/novo" element={<CriarCliente />} />
        <Route path="/cotacoes" element={<ListaCotacoes />} />
        <Route path="/cotacoes/novo" element={<CriarCotacao />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/cotacoes/editar/:id" element={<EditarCotacao />} />
        <Route path="/boletos/novo" element={<CriarBoleto />} />
        <Route path="/tarefas/novo" element={<CriarTarefa />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/tarefas" element={<ListaTarefas />} />
        <Route path="/boletos" element={<Boletos />} />
        <Route path="/boletos/editar/:id" element={<EditarBoleto />} />
        <Route path="/tarefas/editar/:id" element={<EditarTarefa />} />
        <Route path="/clientes/editar/:id" element={<EditarCliente />} />
      </Routes>
    </BrowserRouter>
  );
}
