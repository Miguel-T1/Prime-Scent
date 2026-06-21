const featuredProductsContainer = document.getElementById(
"featured-products"
);

const heroProductsContainer = document.getElementById(
"hero-products"
);

const storyProductImage = document.getElementById(
"story-product-image"
);

const searchForm = document.getElementById(
"search-form"
);

const searchInput = document.getElementById(
"search-input"
);

function createElement(tagName, className, textContent) {
const element = document.createElement(tagName);

if (className) {
element.className = className;
}

if (textContent !== undefined && textContent !== null) {
element.textContent = textContent;
}

return element;
}

function applyProductImageFallback(image) {
image.addEventListener("error", function () {
image.src =
"./assets/img/products/default-perfume.svg";
});
}

function createHeroProduct(product) {
const link = createElement(
"a",
"hero-product-card"
);

link.href =
"./produto.html?id=" + product.id;

const image = createElement(
"img"
);

image.src = product.image;
image.alt = product.name;

applyProductImageFallback(image);

const name = createElement(
"strong",
"",
product.name
);

link.appendChild(image);
link.appendChild(name);

return link;
}

function createFeaturedProductCard(product) {
const article = createElement(
"article",
"product-card"
);

const imageWrapper = createElement(
"div",
"product-image-wrapper"
);

const image = createElement(
"img",
"product-image"
);

image.src = product.image;
image.alt = product.name;

applyProductImageFallback(image);

imageWrapper.appendChild(image);

const brand = createElement(
"p",
"product-brand",
product.brand
);

const name = createElement(
"h3",
"product-name",
product.name
);

const info = createElement(
"p",
"product-info",
product.volume +
" • " +
product.fragrance_family
);

const price = createElement(
"p",
"product-price",
formatPrice(product.price)
);

const button = createElement(
"a",
"product-button"
);

button.href =
"./produto.html?id=" + product.id;

button.appendChild(
createElement(
"span",
"",
"Ver detalhes"
)
);

article.appendChild(imageWrapper);
article.appendChild(brand);
article.appendChild(name);
article.appendChild(info);
article.appendChild(price);
article.appendChild(button);

return article;
}

function renderHeroProducts(products) {
heroProductsContainer.replaceChildren();

const heroProducts = products.slice(0, 3);

heroProducts.forEach(function (product) {
heroProductsContainer.appendChild(
createHeroProduct(product)
);
});

if (products[1]) {
storyProductImage.src =
products[1].image;


storyProductImage.alt =
  products[1].name;

applyProductImageFallback(
  storyProductImage
);


}
}

function renderFeaturedProducts(products) {
featuredProductsContainer.replaceChildren();

products.forEach(function (product) {
featuredProductsContainer.appendChild(
createFeaturedProductCard(product)
);
});
}

function showProductsError() {
const message =
"Não foi possível carregar os produtos. Verifique se a API está rodando.";

heroProductsContainer.replaceChildren(
createElement(
"p",
"loading-message",
message
)
);

featuredProductsContainer.replaceChildren(
createElement(
"p",
"loading-message",
message
)
);
}

async function loadHomeProducts() {
try {
const response = await apiRequest(
"/search?page=1&limit=4"
);


const products = response.data;

if (!products || products.length === 0) {
  const message =
    "Nenhum produto encontrado.";

  heroProductsContainer.replaceChildren(
    createElement(
      "p",
      "loading-message",
      message
    )
  );

  featuredProductsContainer.replaceChildren(
    createElement(
      "p",
      "loading-message",
      message
    )
  );

  return;
}

renderHeroProducts(products);
renderFeaturedProducts(products);


} catch (error) {
console.error(
"Erro ao carregar a Home:",
error.message
);


showProductsError();


}
}

searchForm.addEventListener(
"submit",
function (event) {
event.preventDefault();


const query =
  searchInput.value.trim();

if (!query) {
  window.location.href =
    "./busca.html";

  return;
}

window.location.href =
  "./busca.html?query=" +
  encodeURIComponent(query);


}
);

loadHomeProducts();
