import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Footer } from "../components/footer";
import "../styles/pages/criar-pages.css";

export default function CriarBoleto() {
  const [form, setForm] = useState({
    cliente: "",
    data: new Date().toISOString().split("T")[0],
    vencimento: "30",
    valor: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const formatarValor = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const numero = (parseInt(apenasNumeros) / 100).toFixed(2);
    return "R$ " + numero.replace(".", ",");
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarValor(e.target.value);
    setForm({ ...form, valor: valorFormatado });
  };

  const calcularDataVencimento = (dias: number): string => {
    const dataBase = new Date(form.data);
    dataBase.setDate(dataBase.getDate() + dias);
    return dataBase.toISOString().split("T")[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataVencimento = calcularDataVencimento(parseInt(form.vencimento));

    const boleto = {
      ...form,
      vencimento: dataVencimento
    };

    console.log("Novo boleto:", boleto);
    // enviar para backend futuramente
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="criar-form-wrapper">
            <form className="criar-form" onSubmit={handleSubmit}>
              <h2>NOVO BOLETO</h2>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="cliente">Cliente</label>
                  <input
                    type="text"
                    name="cliente"
                    id="cliente"
                    placeholder="Digite um nome ou CNPJ..."
                    value={form.cliente}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grupo">
                  <label htmlFor="data">Data</label>
                  <input
                    type="date"
                    name="data"
                    id="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="linha">
                <div className="grupo">
                  <label htmlFor="vencimento">Vencimento</label>
                  <select
                    name="vencimento"
                    id="vencimento"
                    value={form.vencimento}
                    onChange={handleChange}
                  >
                    <option value="21">21 dias</option>
                    <option value="30">30 dias</option>
                  </select>
                </div>

                <div className="grupo">
                  <label htmlFor="valor">Valor</label>
                  <input
                    type="text"
                    name="valor"
                    id="valor"
                    placeholder="R$ 0,00"
                    value={form.valor}
                    onChange={handleValorChange}
                    required
                  />
                </div>
              </div>

              <button type="submit">Criar</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
