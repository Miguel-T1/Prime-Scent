const productsList = document.getElementById("products-list");
const resultsTitle = document.getElementById("results-title");
const catalogFilterForm = document.getElementById("catalog-filter-form");
const catalogSearchInput = document.getElementById("catalog-search-input");
const catalogCategorySelect = document.getElementById("catalog-category-select");

const params = new URLSearchParams(window.location.search);

const currentQuery = params.get("query") || "";
const currentCategory = params.get("cat") || "";

catalogSearchInput.value = currentQuery;
catalogCategorySelect.value = currentCategory;

function updateResultsTitle() {
  if (currentQuery && currentCategory) {
    resultsTitle.textContent = `Resultados para "${currentQuery}" em ${currentCategory}`;
    return;
  }

  if (currentQuery) {
    resultsTitle.textContent = `Resultados para "${currentQuery}"`;
    return;
  }

  if (currentCategory) {
    resultsTitle.textContent = `Perfumes ${currentCategory}s`;
    return;
  }

  resultsTitle.textContent = "Todos os perfumes";
}

function createProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-image-wrapper">
        <img
  src="${product.image}"
  alt="${product.name}"
  class="product-image"
  onerror="this.src='./assets/img/products/default-perfume.svg'"
        />
      </div>

      <p class="product-brand">${product.brand}</p>

      <h3 class="product-name">${product.name}</h3>

      <p class="product-info">
        ${product.volume} • ${product.fragrance_family}
      </p>

      <p class="product-price">${formatPrice(product.price)}</p>

      <a href="./produto.html?id=${product.id}" class="product-button">
        <span>Ver detalhes</span>
      </a>
    </article>
  `;
}

async function loadProducts() {
  try {
    updateResultsTitle();

    const queryString = new URLSearchParams({
      query: currentQuery,
      cat: currentCategory,
      page: "1",
      limit: "24"
    });

    const response = await apiRequest(`/search?${queryString.toString()}`);
    const products = response.data;

    if (!products || products.length === 0) {
      productsList.innerHTML = `
        <p class="loading-message">Nenhum perfume encontrado.</p>
      `;
      return;
    }

    productsList.innerHTML = products.map(createProductCard).join("");
  } catch (error) {
    productsList.innerHTML = `
      <p class="loading-message">
        Não foi possível carregar os perfumes. Verifique se a API está rodando.
      </p>
    `;
  }
}

catalogFilterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = catalogSearchInput.value.trim();
  const cat = catalogCategorySelect.value;

  const newParams = new URLSearchParams();

  if (query) {
    newParams.set("query", query);
  }

  if (cat) {
    newParams.set("cat", cat);
  }

  window.location.href = `./busca.html?${newParams.toString()}`;
});

loadProducts();