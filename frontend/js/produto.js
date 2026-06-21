const productDetailContainer = document.getElementById(
"product-detail-container"
);

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

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

function parseAccords(mainAccords) {
if (!mainAccords) {
return [];
}

if (Array.isArray(mainAccords)) {
return mainAccords;
}

try {
return JSON.parse(mainAccords);
} catch (error) {
console.error(
"Erro ao converter os acordes:",
error.message
);


return [];


}
}

function createInfoItem(label, value) {
const item = createElement(
"div",
"product-detail-info-item"
);

const itemLabel = createElement(
"span",
"",
label
);

const itemValue = createElement(
"strong",
"",
value || "Não informado"
);

item.appendChild(itemLabel);
item.appendChild(itemValue);

return item;
}

function createOlfactoryItem(label, value) {
const item = createElement(
"div",
"olfactory-item"
);

const itemLabel = createElement(
"span",
"",
label
);

const itemValue = createElement(
"strong",
"",
value || "Não informado"
);

item.appendChild(itemLabel);
item.appendChild(itemValue);

return item;
}

function createAccordsList(mainAccords) {
const accordsList = createElement(
"div",
"accords-list"
);

const accords = parseAccords(mainAccords);

if (accords.length === 0) {
accordsList.appendChild(
createElement(
"p",
"empty-accords",
"Acordes não informados."
)
);


return accordsList;


}

accords.forEach(function (accord) {
const tone = accord.tone || "default";
const intensity =
Number(accord.intensity) || 50;


const name = accord.name || "Acorde";

const accordBar = createElement(
  "div",
  "accord-bar accord-" + tone
);

accordBar.style.setProperty(
  "--accord-width",
  intensity + "%"
);

accordBar.appendChild(
  createElement(
    "span",
    "",
    name
  )
);

accordBar.appendChild(
  createElement(
    "i",
    "particle particle-one"
  )
);

accordBar.appendChild(
  createElement(
    "i",
    "particle particle-two"
  )
);

accordBar.appendChild(
  createElement(
    "i",
    "particle particle-three"
  )
);

accordBar.appendChild(
  createElement(
    "i",
    "particle particle-four"
  )
);

accordsList.appendChild(accordBar);


});

return accordsList;
}

function renderProduct(product) {
productDetailContainer.replaceChildren();

const article = createElement(
"article",
"product-detail-card"
);

const mainLayout = createElement(
"div",
"product-main-layout"
);

const visualColumn = createElement(
"div",
"product-visual-column"
);

const imageArea = createElement(
"div",
"product-detail-image-area"
);

const image = createElement(
"img",
"product-detail-image"
);

image.src = product.image;
image.alt = product.name;

image.addEventListener(
"error",
function () {
image.src =
"./assets/img/products/default-perfume.svg";
}
);

imageArea.appendChild(image);
visualColumn.appendChild(imageArea);

const detailContent = createElement(
"section",
"product-detail-content"
);

detailContent.appendChild(
createElement(
"p",
"product-detail-brand",
product.brand
)
);

detailContent.appendChild(
createElement(
"h2",
"product-detail-title",
product.name
)
);

detailContent.appendChild(
createElement(
"p",
"product-detail-description",
product.description ||
"Descrição não informada."
)
);

const infoGrid = createElement(
"div",
"product-detail-info-grid"
);

infoGrid.appendChild(
createInfoItem(
"Gênero",
product.gender
)
);

infoGrid.appendChild(
createInfoItem(
"Volume",
product.volume
)
);

infoGrid.appendChild(
createInfoItem(
"Categoria",
product.category
)
);

infoGrid.appendChild(
createInfoItem(
"Família olfativa",
product.fragrance_family
)
);

detailContent.appendChild(infoGrid);

const purchasePanel = createElement(
"aside",
"product-purchase-panel"
);

purchasePanel.appendChild(
createElement(
"p",
"purchase-label",
"Preço"
)
);

purchasePanel.appendChild(
createElement(
"p",
"purchase-price",
formatPrice(product.price)
)
);

purchasePanel.appendChild(
createElement(
"p",
"purchase-stock",
"Em estoque"
)
);

purchasePanel.appendChild(
createElement(
"p",
"purchase-shipping",
"Frete grátis em compras acima de R$ 200,00. Abaixo desse valor, o frete simulado é de R$ 25,00."
)
);

const quantityLabel = createElement(
"label",
"purchase-quantity-label",
"Quantidade"
);

quantityLabel.htmlFor =
"product-quantity";

purchasePanel.appendChild(
quantityLabel
);

const productActions = createElement(
"div",
"product-actions"
);

const quantityControl = createElement(
"div",
"quantity-control"
);

const quantityInput = createElement(
"input"
);

quantityInput.type = "number";
quantityInput.id =
"product-quantity";

quantityInput.value = "1";
quantityInput.min = "1";
quantityInput.max = "99";

quantityControl.appendChild(
quantityInput
);

const addCartButton = createElement(
"button",
"add-cart-button"
);

addCartButton.id =
"add-cart-button";

addCartButton.type = "button";

addCartButton.appendChild(
createElement(
"span",
"",
"Adicionar ao carrinho"
)
);

productActions.appendChild(
quantityControl
);

productActions.appendChild(
addCartButton
);

purchasePanel.appendChild(
productActions
);

const continueShoppingLink =
createElement(
"a",
"continue-shopping-link",
"Continuar comprando"
);

continueShoppingLink.href =
"./busca.html";

purchasePanel.appendChild(
continueShoppingLink
);

const feedback = createElement(
"p",
"product-feedback"
);

feedback.id = "product-feedback";

purchasePanel.appendChild(
feedback
);

purchasePanel.appendChild(
createElement(
"p",
"purchase-security",
"Os preços e as informações do produto são carregados diretamente do banco de dados."
)
);

mainLayout.appendChild(
visualColumn
);

mainLayout.appendChild(
detailContent
);

mainLayout.appendChild(
purchasePanel
);

const sensoryLayout = createElement(
"div",
"product-sensory-layout"
);

const olfactorySection =
createElement(
"section",
"olfactory-pyramid"
);

olfactorySection.appendChild(
createElement(
"p",
"section-subtitle",
"Pirâmide olfativa"
)
);

const olfactoryGrid = createElement(
"div",
"olfactory-grid"
);

olfactoryGrid.appendChild(
createOlfactoryItem(
"Notas de saída",
product.top_notes
)
);

olfactoryGrid.appendChild(
createOlfactoryItem(
"Notas de coração",
product.heart_notes
)
);

olfactoryGrid.appendChild(
createOlfactoryItem(
"Notas de fundo",
product.base_notes
)
);

olfactorySection.appendChild(
olfactoryGrid
);

const accordsSection = createElement(
"section",
"accords-section"
);

accordsSection.appendChild(
createElement(
"p",
"section-subtitle",
"Principais acordes"
)
);

accordsSection.appendChild(
createAccordsList(
product.main_accords
)
);

sensoryLayout.appendChild(
olfactorySection
);

sensoryLayout.appendChild(
accordsSection
);

article.appendChild(
mainLayout
);

article.appendChild(
sensoryLayout
);

productDetailContainer.appendChild(
article
);

addCartButton.addEventListener(
"click",
function () {
const quantity = Number(
quantityInput.value
);


  const invalidQuantity =
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 99;

  if (invalidQuantity) {
    feedback.textContent =
      "Informe uma quantidade válida entre 1 e 99.";

    return;
  }

  addToCart(
    product.id,
    quantity
  );

  feedback.textContent =
    "Produto adicionado ao carrinho com sucesso.";
}


);
}

function showMessage(message) {
productDetailContainer.replaceChildren(
createElement(
"p",
"loading-message",
message
)
);
}

async function loadProduct() {
const invalidProductId =
!Number.isInteger(productId) ||
productId < 1;

if (invalidProductId) {
showMessage(
"Produto inválido."
);


return;


}

try {
const response = await apiRequest(
"/product/" + productId
);


if (
  !response ||
  !response.data
) {
  throw new Error(
    "Produto não encontrado."
  );
}

renderProduct(
  response.data
);


} catch (error) {
console.error(
"Erro ao carregar produto:",
error.message
);


showMessage(
  "Não foi possível carregar este produto. Verifique se ele existe e se a API está rodando."
);


}
}

loadProduct();
