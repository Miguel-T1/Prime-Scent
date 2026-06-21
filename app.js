const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const db = require("./database/db");
const basicAuth = require("./middlewares/basicAuth");
const swaggerDocument = require("./openapi.json");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 50;
const FREE_SHIPPING_MINIMUM = 200;
const DEFAULT_FREIGHT = 25;
const DISCOUNT_COUPON = "CAULFIELD10";
const DISCOUNT_RATE = 0.1;

app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.use(
"/api-docs",
swaggerUi.serve,
swaggerUi.setup(swaggerDocument)
);

function parsePositiveInteger(value) {
const parsedValue = Number(value);

if (!Number.isInteger(parsedValue) || parsedValue < 1) {
return null;
}

return parsedValue;
}

function parseOptionalQueryText(value) {
if (value === undefined) {
return "";
}

if (typeof value !== "string") {
return null;
}

return value.trim();
}

function normalizeRequiredText(value) {
if (typeof value !== "string") {
return null;
}

const normalizedValue = value.trim();
return normalizedValue ? normalizedValue : null;
}

function isPlainObject(value) {
return value !== null && typeof value === "object" && !Array.isArray(value);
}

app.get("/health", (req, res) => {
return res.status(200).json({
success: true,
message: "API Prime Scent funcionando"
});
});

app.get("/search", async (req, res) => {
try {
const query = parseOptionalQueryText(req.query.query);
const category = parseOptionalQueryText(req.query.cat);


const page = req.query.page === undefined
  ? DEFAULT_PAGE
  : parsePositiveInteger(req.query.page);

const limit = req.query.limit === undefined
  ? DEFAULT_LIMIT
  : parsePositiveInteger(req.query.limit);

if (query === null) {
  return res.status(400).json({
    success: false,
    message: "O parâmetro query deve ser um texto."
  });
}

if (category === null) {
  return res.status(400).json({
    success: false,
    message: "O parâmetro cat deve ser um texto."
  });
}

if (page === null) {
  return res.status(400).json({
    success: false,
    message: "O parâmetro page deve ser um número inteiro maior ou igual a 1."
  });
}

if (limit === null || limit > MAX_LIMIT) {
  return res.status(400).json({
    success: false,
    message: "O parâmetro limit deve ser um número inteiro entre 1 e 50."
  });
}

const offset = (page - 1) * limit;

let sql =
  "SELECT id, name, brand, price, category, gender, volume, " +
  "fragrance_family, weight, description, image, created_at " +
  "FROM products WHERE 1 = 1";

const params = [];

if (query) {
  sql +=
    " AND (name LIKE ? OR brand LIKE ? OR category LIKE ? " +
    "OR gender LIKE ? OR volume LIKE ? OR fragrance_family LIKE ? " +
    "OR description LIKE ?)";

  const searchTerm = "%" + query + "%";

  params.push(
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm
  );
}

if (category) {
  sql += " AND category = ?";
  params.push(category);
}

sql += " ORDER BY id ASC LIMIT ? OFFSET ?";
params.push(limit, offset);

const [products] = await db.query(sql, params);

return res.status(200).json({
  success: true,
  page,
  limit,
  totalOnPage: products.length,
  data: products
});


} catch (error) {
console.error("Erro na rota GET /search:", error.message);


return res.status(500).json({
  success: false,
  message: "Erro interno ao buscar produtos."
});


}
});

app.get("/product/:id", async (req, res) => {
try {
const id = parsePositiveInteger(req.params.id);

if (id === null) {
  return res.status(400).json({
    success: false,
    message: "ID do produto inválido."
  });
}

const [products] = await db.query(
  "SELECT * FROM products WHERE id = ?",
  [id]
);

if (products.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Produto não encontrado."
  });
}

return res.status(200).json({
  success: true,
  data: products[0]
});


} catch (error) {
console.error("Erro na rota GET /product/:id:", error.message);


return res.status(500).json({
  success: false,
  message: "Erro interno ao buscar produto."
});


}
});

app.post("/products", basicAuth, async (req, res) => {
try {
if (!isPlainObject(req.body)) {
return res.status(400).json({
success: false,
message: "O corpo da requisição deve ser um objeto JSON."
});
}


const name = normalizeRequiredText(req.body.name);
const brand = normalizeRequiredText(req.body.brand);
const category = normalizeRequiredText(req.body.category);
const gender = normalizeRequiredText(req.body.gender);
const volume = normalizeRequiredText(req.body.volume);
const fragranceFamily = normalizeRequiredText(req.body.fragrance_family);
const description = normalizeRequiredText(req.body.description);
const image = normalizeRequiredText(req.body.image);

if (
  !name ||
  !brand ||
  !category ||
  !gender ||
  !volume ||
  !fragranceFamily ||
  !description ||
  !image
) {
  return res.status(400).json({
    success: false,
    message: "Todos os campos do produto são obrigatórios."
  });
}

const price = Number(req.body.price);
const weight = Number(req.body.weight);

if (!Number.isFinite(price) || price <= 0) {
  return res.status(400).json({
    success: false,
    message: "O preço do produto deve ser um número maior que zero."
  });
}

if (!Number.isFinite(weight) || weight <= 0) {
  return res.status(400).json({
    success: false,
    message: "O peso do produto deve ser um número maior que zero."
  });
}

const sql =
  "INSERT INTO products " +
  "(name, brand, price, category, gender, volume, fragrance_family, " +
  "weight, description, image) " +
  "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

const values = [
  name,
  brand,
  price,
  category,
  gender,
  volume,
  fragranceFamily,
  weight,
  description,
  image
];

const [result] = await db.query(sql, values);

const [createdProducts] = await db.query(
  "SELECT * FROM products WHERE id = ?",
  [result.insertId]
);

return res.status(201).json({
  success: true,
  message: "Produto cadastrado com sucesso.",
  data: createdProducts[0]
});


} catch (error) {
console.error("Erro na rota POST /products:", error.message);

return res.status(500).json({
  success: false,
  message: "Erro interno ao cadastrar produto."
});


}
});

app.delete("/product/:id", basicAuth, async (req, res) => {
try {
const id = parsePositiveInteger(req.params.id);


if (id === null) {
  return res.status(400).json({
    success: false,
    message: "ID do produto inválido."
  });
}

const [existingProducts] = await db.query(
  "SELECT * FROM products WHERE id = ?",
  [id]
);

if (existingProducts.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Produto não encontrado."
  });
}

await db.query(
  "DELETE FROM products WHERE id = ?",
  [id]
);

return res.status(200).json({
  success: true,
  message: "Produto deletado com sucesso.",
  data: existingProducts[0]
});


} catch (error) {
console.error("Erro na rota DELETE /product/:id:", error.message);


return res.status(500).json({
  success: false,
  message: "Erro interno ao deletar produto."
});


}
});

app.post("/cart", async (req, res) => {
try {
if (!isPlainObject(req.body)) {
return res.status(400).json({
success: false,
message: "O corpo da requisição deve ser um objeto JSON."
});
}

const { items, cupomCode } = req.body;

if (!Array.isArray(items) || items.length === 0) {
  return res.status(400).json({
    success: false,
    message: "O carrinho deve conter pelo menos um item."
  });
}

let normalizedCoupon = "";

if (cupomCode !== undefined && cupomCode !== null) {
  if (typeof cupomCode !== "string") {
    return res.status(400).json({
      success: false,
      message: "O código do cupom deve ser um texto."
    });
  }

  normalizedCoupon = cupomCode.trim().toUpperCase();
}

const normalizedItems = [];

for (const item of items) {
  if (!isPlainObject(item)) {
    return res.status(400).json({
      success: false,
      message: "Cada item do carrinho deve ser um objeto."
    });
  }

  const productId = parsePositiveInteger(item.productId);
  const quantity = parsePositiveInteger(item.qty);

  if (productId === null) {
    return res.status(400).json({
      success: false,
      message: "ID de produto inválido no carrinho."
    });
  }

  if (quantity === null) {
    return res.status(400).json({
      success: false,
      message: "A quantidade do produto deve ser um número inteiro maior ou igual a 1."
    });
  }

  const existingItem = normalizedItems.find(
    (cartItem) => cartItem.productId === productId
  );

  if (existingItem) {
    existingItem.qty += quantity;
  } else {
    normalizedItems.push({
      productId,
      qty: quantity
    });
  }
}

const productIds = normalizedItems.map(
  (item) => item.productId
);

const placeholders = productIds
  .map(() => "?")
  .join(",");

const cartSql =
  "SELECT id, name, price, image FROM products " +
  "WHERE id IN (" + placeholders + ")";

const [products] = await db.query(
  cartSql,
  productIds
);

if (products.length !== productIds.length) {
  const foundIds = products.map(
    (product) => product.id
  );

  const missingIds = productIds.filter(
    (productId) => !foundIds.includes(productId)
  );

  return res.status(404).json({
    success: false,
    message: "Um ou mais produtos do carrinho não foram encontrados.",
    missingProductIds: missingIds
  });
}

const cartItems = normalizedItems.map((item) => {
  const product = products.find(
    (currentProduct) =>
      currentProduct.id === item.productId
  );

  const price = Number(product.price);
  const subtotal = price * item.qty;

  return {
    productId: product.id,
    name: product.name,
    price,
    qty: item.qty,
    image: product.image,
    subtotal: Number(subtotal.toFixed(2))
  };
});

const subtotal = cartItems.reduce(
  (totalValue, item) =>
    totalValue + item.subtotal,
  0
);

const freight =
  subtotal >= FREE_SHIPPING_MINIMUM
    ? 0
    : DEFAULT_FREIGHT;

const discount =
  normalizedCoupon === DISCOUNT_COUPON
    ? subtotal * DISCOUNT_RATE
    : 0;

const total =
  subtotal + freight - discount;

return res.status(200).json({
  success: true,
  items: cartItems,
  subtotal: Number(subtotal.toFixed(2)),
  freight: Number(freight.toFixed(2)),
  discount: Number(discount.toFixed(2)),
  total: Number(total.toFixed(2))
});


} catch (error) {
console.error("Erro na rota POST /cart:", error.message);


return res.status(500).json({
  success: false,
  message: "Erro interno ao calcular carrinho."
});


}
});

app.use((req, res) => {
return res.status(404).json({
success: false,
message: "Rota não encontrada."
});
});

app.use((error, req, res, next) => {
if (
error instanceof SyntaxError &&
error.status === 400 &&
Object.prototype.hasOwnProperty.call(
error,
"body"
)
) {
return res.status(400).json({
success: false,
message: "O JSON enviado é inválido."
});
}

console.error(
"Erro não tratado:",
error.message
);

return res.status(500).json({
success: false,
message: "Erro interno do servidor."
});
});

if (require.main === module) {
app.listen(PORT, () => {
console.log(
"Servidor rodando na porta " + PORT
);


console.log(
  "Swagger disponível em http://localhost:" +
    PORT +
    "/api-docs/"
);


});
}

module.exports = app;
