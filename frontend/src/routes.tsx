import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CriarCliente from "./pages/criar-cliente";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes/novo" element={<CriarCliente />} />
      </Routes>
    </BrowserRouter>
  );
}
