import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CriarCliente from "./pages/criar-cliente";
import ListaClientes from "./pages/clientes";
import ListaCotacoes from "./pages/cotacoes";
import CriarCotacao from "./pages/criar-cotacao";
import Login from "./pages/login";
import EditarCotacao from "./pages/editar-cotacoes";
import CriarBoleto from "./pages/criar-boleto";

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
        {/* <Route path="/cotacoes/editar/:id" element={<EditarCotacao />} /> */}
        <Route path="/boletos/novo" element={<CriarBoleto />} />
      </Routes>
    </BrowserRouter>
  );
}
