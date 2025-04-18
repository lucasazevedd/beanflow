import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import InputMask from "react-input-mask";


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

  return (
    <div className="home"> {/* mesma classe da home */}
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
                  <InputMask
                    mask="99.999.999/9999-99"
                    value={form.cnpj}
                    onChange={handleChange}
                >
                    {(inputProps: any) => (
                    <input
                        {...inputProps}
                        type="text"
                        name="cnpj"
                        id="cnpj"
                        placeholder="12.345.678/0001-90"
                        required
                    />
                    )}
                </InputMask>
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
                    type="text"
                    name="telefone"
                    id="telefone"
                    placeholder="(12) 34567-8901"
                    value={form.telefone}
                    onChange={handleChange}
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
