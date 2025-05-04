import "../styles/pages/login.css";
import LogoIcon from "../assets/icons/bean-flow-logo";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-wrapper">
          <LogoIcon className="beanflow-logo" />
          <h1 className="beanflow-title">beanflow</h1>
        </div>

        <form className="form-login" onSubmit={(e) => e.preventDefault()}>
          <div className="grupo">
            <label htmlFor="login">login</label>
            <input
              type="email"
              id="login"
              name="login"
              placeholder="seumelhor@email.com"
              required
            />
          </div>

          <div className="grupo">
            <label htmlFor="senha">senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="sua senha mais secreta"
              required
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
