export function statusCotacoes(status: string) {
    const mapa: Record<string, string> = {
      "Realizar orçamento": "📐 Realizar orçamento",
      "Ajustar Preço": "🛠️ Ajustar Preço",
      "Enviar cotação": "📤 Enviar cotação",
      "Aprovação do Orçamento": "✅ Aprovação do Orçamento",
      "Faturar pedido": "🧾 Faturar pedido",
      "Pagamento": "💳 Pagamento",
      "Entrega do material": "📦 Entrega do material",
    };
    return mapa[status] || status;
  }