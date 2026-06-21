require("dotenv").config();

function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({
      success: false,
      message: "Autenticação obrigatória."
    });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");

  const [username, password] = credentials.split(":");

  const validUser = process.env.BASIC_AUTH_USER;
  const validPassword = process.env.BASIC_AUTH_PASS;

  if (username !== validUser || password !== validPassword) {
    return res.status(401).json({
      success: false,
      message: "Usuário ou senha inválidos."
    });
  }

  next();
}

module.exports = basicAuth;