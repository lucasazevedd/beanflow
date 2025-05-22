// utils/money.ts

export const formatarMoeda = (valor: string): string => {
  const somenteNumeros = valor.replace(/\D/g, "");
  const valorFormatado = (parseInt(somenteNumeros || "0") / 100).toFixed(2);
  return "R$ " + valorFormatado.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatarParaNumero = (valor: string): number => {
  return parseFloat(valor.replace(/[^\d,]/g, "").replace(",", "."));
};
