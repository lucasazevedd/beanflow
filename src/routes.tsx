import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CriarCliente from "./pages/criar-cliente";
import ListaClientes from "./pages/clientes";
import ListaCotacoes from "./pages/cotacoes";
import CriarCotacao from "./pages/criar-cotacao";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/clientes/novo" element={<CriarCliente />} />
        <Route path="/cotacoes" element={<ListaCotacoes />} />
        <Route path="/cotacoes/novo" element={<CriarCotacao />} /> 
      </Routes>
    </BrowserRouter>
  );
}
