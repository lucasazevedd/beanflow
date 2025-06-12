import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";
import LogoIcon from "../assets/icons/bean-flow-logo";
import api from "../services/api"; // usando o axios configurado

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
      const response = await api.post("/login", form);
      const data = response.data;

      sessionStorage.setItem("token", data.token); // ⬅️ salva token na session
      navigate("/");
    } catch (error: any) {
      const msg = error.response?.data?.mensagem || "Erro ao tentar logar.";
      alert(msg);
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