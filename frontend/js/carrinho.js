const cartContainer = document.getElementById("cart-container");

let currentCoupon = "CAULFIELD10";

function renderEmptyCart() {
  cartContainer.innerHTML = `
    <div class="empty-cart">
      <p class="section-subtitle">Carrinho vazio</p>
      <h2>Nenhum perfume selecionado</h2>
      <p>
        Explore o catálogo Prime Scent e adicione suas fragrâncias favoritas ao carrinho.
      </p>

      <a href="./busca.html" class="primary-button empty-cart-button">
        <span>Ver perfumes</span>
      </a>
    </div>
  `;
}

function createCartItem(item) {
  return `
    <article class="cart-item">
      <div class="cart-item-image-wrapper">
        <img
          src="${item.image}"
          alt="${item.name}"
          class="cart-item-image"
          onerror="this.src='./assets/img/products/default-perfume.svg'"
        />
      </div>

      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>${formatPrice(item.price)}</p>
      </div>

      <div class="cart-item-quantity">
        <label>Qtd.</label>
        <input
          type="number"
          min="1"
          max="99"
          value="${item.qty}"
          data-product-id="${item.productId}"
          class="cart-qty-input"
        />
      </div>

      <p class="cart-item-subtotal">
        ${formatPrice(item.subtotal)}
      </p>

      <button
        class="cart-remove-button"
        data-product-id="${item.productId}"
      >
        Remover
      </button>
    </article>
  `;
}

function renderCart(cartData) {
  cartContainer.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items-area">
        <div class="cart-area-header">
          <p class="section-subtitle">Itens selecionados</p>
          <h2>Meu carrinho</h2>
        </div>

        <div class="cart-items-list">
          ${cartData.items.map(createCartItem).join("")}
        </div>
      </div>

      <aside class="cart-summary">
        <p class="section-subtitle">Resumo</p>

        <div class="coupon-box">
          <label for="coupon-input">Cupom de desconto</label>

          <div class="coupon-input-row">
            <input
              type="text"
              id="coupon-input"
              value="${currentCoupon}"
              placeholder="Digite seu cupom"
            />

            <button id="apply-coupon-button">
              <span>Aplicar</span>
            </button>
          </div>

          <small>Cupom disponível: CAULFIELD10</small>
        </div>

        <div class="summary-line">
          <span>Subtotal</span>
          <strong>${formatPrice(cartData.subtotal)}</strong>
        </div>

        <div class="summary-line">
          <span>Frete</span>
          <strong>${cartData.freight === 0 ? "Grátis" : formatPrice(cartData.freight)}</strong>
        </div>

        <div class="summary-line discount">
          <span>Desconto</span>
          <strong>- ${formatPrice(cartData.discount)}</strong>
        </div>

        <div class="summary-total">
          <span>Total</span>
          <strong>${formatPrice(cartData.total)}</strong>
        </div>

        <button id="clear-cart-button" class="clear-cart-button">
          Limpar carrinho
        </button>
      </aside>
    </div>
  `;

  setupCartEvents();
}

function setupCartEvents() {
  const quantityInputs = document.querySelectorAll(".cart-qty-input");
  const removeButtons = document.querySelectorAll(".cart-remove-button");
  const applyCouponButton = document.getElementById("apply-coupon-button");
  const couponInput = document.getElementById("coupon-input");
  const clearCartButton = document.getElementById("clear-cart-button");

  quantityInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const productId = Number(input.dataset.productId);
      const qty = Number(input.value);

      if (!qty || qty < 1) {
        input.value = 1;
        updateCartItemQty(productId, 1);
      } else {
        updateCartItemQty(productId, qty);
      }

      loadCart();
    });
  });

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.productId);

      removeFromCart(productId);
      loadCart();
    });
  });

  applyCouponButton.addEventListener("click", () => {
    currentCoupon = couponInput.value.trim();

    loadCart();
  });

  clearCartButton.addEventListener("click", () => {
    clearCart();
    renderEmptyCart();
  });
}

async function loadCart() {
  try {
    const cart = getCart();

    if (cart.length === 0) {
      renderEmptyCart();
      return;
    }

    const response = await apiRequest("/cart", {
      method: "POST",
      body: JSON.stringify({
        items: cart,
        cupomCode: currentCoupon
      })
    });

    renderCart(response);
  } catch (error) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <p class="section-subtitle">Erro no carrinho</p>
        <h2>Não foi possível carregar o carrinho</h2>
        <p>
          Verifique se a API está rodando e se os produtos adicionados ainda existem no banco.
        </p>

        <button id="clear-broken-cart-button" class="clear-cart-button">
          Limpar carrinho
        </button>
      </div>
    `;

    const clearBrokenCartButton = document.getElementById("clear-broken-cart-button");

    clearBrokenCartButton.addEventListener("click", () => {
      clearCart();
      renderEmptyCart();
    });
  }
}

loadCart();