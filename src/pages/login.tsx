import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";
import LogoIcon from "../assets/icons/bean-flow-logo";
import { API_BASE_URL } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // 🔐 salva o JWT
        navigate("/"); // redireciona para home
      } else {
        alert(data.mensagem); // exemplo: "Usuário ou senha inválidos"
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao tentar logar.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-wrapper">
          <LogoIcon className="beanflow-logo" />
          <h1 className="beanflow-title">beanflow</h1>
        </div>

        <form className="form-login" onSubmit={handleSubmit}>
          <div className="grupo">
            <label htmlFor="username">login</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="seu usuário por favor :)"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grupo">
            <label htmlFor="password">senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="sua senha mais secreta"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
