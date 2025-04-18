import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import "../styles/criar-cliente.css";

export default function CriarCliente() {
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    razaoSocial: "",
    email: "",
    telefone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cliente cadastrado:", form);
  };

  function formatarTelefone(valor: string) {
    const somenteNumeros = valor.replace(/\D/g, "").slice(0, 11); // limita a 11 dígitos
    const match = somenteNumeros.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  
    if (!match) return valor;
  
    const [, ddd, parte1, parte2] = match;
    if (parte2) return `(${ddd}) ${parte1}-${parte2}`;
    if (parte1) return `(${ddd}) ${parte1}`;
    if (ddd) return `(${ddd}`;
    return "";
  }

  function formatarCNPJ(valor: string) {
    const numeros = valor.replace(/\D/g, "").slice(0, 14); // limita a 14 dígitos
    const match = numeros.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/);
  
    if (!match) return valor;
  
    const [, parte1, parte2, parte3, parte4, parte5] = match;
    let resultado = "";
    if (parte1) resultado += parte1;
    if (parte2) resultado += `.${parte2}`;
    if (parte3) resultado += `.${parte3}`;
    if (parte4) resultado += `/${parte4}`;
    if (parte5) resultado += `-${parte5}`;
    return resultado;
  }  

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <Header />
          <div className="criar-cliente-wrapper">
            <form className="form-cliente" onSubmit={handleSubmit}>
              <h2>Novo Cliente</h2>

              <div className="grupo">
                <label htmlFor="nome">Nome<span>*</span></label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="cnpj">CNPJ<span>*</span></label>
                  <input
                    type="text"
                    name="cnpj"
                    id="cnpj"
                    value={form.cnpj}
                    onChange={(e) => {
                        const formatado = formatarCNPJ(e.target.value);
                        setForm({ ...form, cnpj: formatado });
                    }}
                    placeholder="00.000.000/0000-00"
                    required
                    />
                </div>

                <div className="grupo">
                  <label htmlFor="razaoSocial">Razão Social</label>
                  <input
                    type="text"
                    name="razaoSocial"
                    id="razaoSocial"
                    value={form.razaoSocial}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="seumelhor@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="grupo">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    id="telefone"
                    value={form.telefone}
                    onChange={(e) => {
                        const formatado = formatarTelefone(e.target.value);
                        setForm({ ...form, telefone: formatado });
                    }}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <button type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
