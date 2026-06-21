const API_BASE_URL = "http://localhost:3000";

async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao buscar dados da API.");
    }

    return data;
  } catch (error) {
    console.error("Erro na comunicação com a API:", error.message);
    throw error;
  }
}

function formatPrice(price) {
  return Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}