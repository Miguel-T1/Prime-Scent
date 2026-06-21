const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db = require("./database/db");
const basicAuth = require("./middlewares/basicAuth");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const app = express();
const PORT = process.env.PORT || 3000;

console.log("Usuário do banco:", process.env.DB_USER);
console.log("Banco usado:", process.env.DB_NAME);

app.use(cors());
app.use(express.json());
app.use(
"/api-docs",
swaggerUi.serve,
swaggerUi.setup(swaggerDocument)
);


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Prime Scent funcionando"
  });
});


app.get("/search", async (req, res) => {
  try {
    const query = req.query.query || "";
    const cat = req.query.cat || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: "O parâmetro page deve ser maior ou igual a 1."
      });
    }

    if (limit < 1 || limit > 50) {
      return res.status(400).json({
        success: false,
        message: "O parâmetro limit deve estar entre 1 e 50."
      });
    }

    const offset = (page - 1) * limit;

    let sql = `
      SELECT 
        id,
        name,
        brand,
        price,
        category,
        gender,
        volume,
        fragrance_family,
        weight,
        description,
        image,
        created_at
      FROM products
      WHERE 1 = 1
    `;

    const params = [];

    if (query) {
      sql += `
        AND (
          name LIKE ?
          OR brand LIKE ?
          OR category LIKE ?
          OR gender LIKE ?
          OR volume LIKE ?
          OR fragrance_family LIKE ?
          OR description LIKE ?
        )
      `;

      const searchTerm = `%${query}%`;

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

    if (cat) {
      sql += ` AND category = ?`;
      params.push(cat);
    }

    sql += ` ORDER BY id ASC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [products] = await db.query(sql, params);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalOnPage: products.length,
      data: products
    });
  } catch (error) {
    console.error("Erro na rota /search:", error.message);

    res.status(500).json({
      success: false,
      message: "Erro interno ao buscar produtos."
    });
  }
});

app.post("/products", basicAuth, async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      category,
      gender,
      volume,
      fragrance_family,
      weight,
      description,
      image
    } = req.body;

    if (
      !name ||
      !brand ||
      !price ||
      !category ||
      !gender ||
      !volume ||
      !fragrance_family ||
      !weight ||
      !description ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos do produto são obrigatórios."
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "O preço do produto deve ser maior que zero."
      });
    }

    if (Number(weight) <= 0) {
      return res.status(400).json({
        success: false,
        message: "O peso do produto deve ser maior que zero."
      });
    }

    const sql = `
      INSERT INTO products
      (name, brand, price, category, gender, volume, fragrance_family, weight, description, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      brand,
      Number(price),
      category,
      gender,
      volume,
      fragrance_family,
      Number(weight),
      description,
      image
    ];

    const [result] = await db.query(sql, values);

    const [createdProduct] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Produto cadastrado com sucesso.",
      data: createdProduct[0]
    });
  } catch (error) {
    console.error("Erro na rota POST /products:", error.message);

    res.status(500).json({
      success: false,
      message: "Erro interno ao cadastrar produto."
    });
  }
});


app.get("/product/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || id < 1) {
      return res.status(400).json({
        success: false,
        message: "ID do produto inválido."
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado."
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error("Erro na rota /product/:id:", error.message);

    res.status(500).json({
      success: false,
      message: "Erro interno ao buscar produto."
    });
  }
});
app.delete("/product/:id", basicAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || id < 1) {
      return res.status(400).json({
        success: false,
        message: "ID do produto inválido."
      });
    }

    const [existingProduct] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (existingProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado."
      });
    }

    await db.query("DELETE FROM products WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Produto deletado com sucesso.",
      data: existingProduct[0]
    });
  } catch (error) {
    console.error("Erro na rota DELETE /product/:id:", error.message);

    res.status(500).json({
      success: false,
      message: "Erro interno ao deletar produto."
    });
  }
});
app.post("/cart", async (req, res) => {
  try {
    const { items, cupomCode } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "O carrinho deve conter pelo menos um item."
      });
    }

    const normalizedItems = [];

    for (const item of items) {
      const productId = Number(item.productId);
      const qty = Number(item.qty);

      if (!productId || productId < 1) {
        return res.status(400).json({
          success: false,
          message: "ID de produto inválido no carrinho."
        });
      }

      if (!qty || qty < 1) {
        return res.status(400).json({
          success: false,
          message: "Quantidade inválida no carrinho."
        });
      }

      const existingItem = normalizedItems.find(
        (cartItem) => cartItem.productId === productId
      );

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        normalizedItems.push({
          productId,
          qty
        });
      }
    }

    const productIds = normalizedItems.map((item) => item.productId);
    const placeholders = productIds.map(() => "?").join(",");

    const [products] = await db.query(
      `SELECT id, name, price, image FROM products WHERE id IN (${placeholders})`,
      productIds
    );

    if (products.length !== productIds.length) {
      const foundIds = products.map((product) => product.id);

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
      const product = products.find((product) => product.id === item.productId);

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

    const subtotal = cartItems.reduce((acc, item) => {
      return acc + item.subtotal;
    }, 0);

    const freight = subtotal >= 200 ? 0 : 25;

    let discount = 0;

if (cupomCode && cupomCode.toUpperCase() === "CAULFIELD10") {
  discount = subtotal * 0.1;
}

    const total = subtotal + freight - discount;

    res.status(200).json({
      success: true,
      items: cartItems,
      subtotal: Number(subtotal.toFixed(2)),
      freight: Number(freight.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      total: Number(total.toFixed(2))
    });
  } catch (error) {
    console.error("Erro na rota POST /cart:", error.message);

    res.status(500).json({
      success: false,
      message: "Erro interno ao calcular carrinho."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});