const express = require("express");
const mysql = require("mysql2/promise"); // Usa promise para async/await
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors()); // Permite requisições do frontend (React na porta 3100)
app.use(express.json()); // Para parsear JSON

// Configuração do banco MySQL (no servidor B)
const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",     // ← IP do servidor B onde está o MySQL
  user: process.env.DB_USER || "loja",          // usuário MySQL
  password: process.env.DB_PASS || "loja123",   // senha
  database: process.env.DB_NAME || "loja_online", // banco
  port: process.env.DB_PORT || 3306,            // porta MySQL
  connectTimeout: 10000,                        // 10s para timeout
};

// Teste de conexão ao banco (opcional, mas bom no startup)
async function testDB() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("✅ Conexão com MySQL funcionando!");
    await connection.end(); // Fecha conexão de teste
  } catch (err) {
    console.error("❌ Falha ao conectar ao MySQL:", err.message);
  }
}

// Chama o teste ao iniciar
testDB();

// Rota raiz
app.get("/", (req, res) => {
  res.send("API da Loja Online 🚀 rodando e conectada ao MySQL!");
});

// Rota: GET /produtos → lista todos os produtos
app.get("/produtos", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT id, nome, preco, descricao FROM produtos ORDER BY nome"
    );
    await connection.end();

    console.log(`✅ Retornando ${rows.length} produtos`);
    res.json(rows);
  } catch (err) {
    console.error("❌ Erro ao buscar produtos:", err);
    res.status(500).json({
      error: "Erro ao acessar o banco de dados MySQL.",
      detail: err.message,
    });
  }
});

// Rota: GET /produtos/:id → detalhe de um produto
app.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM produtos WHERE id = ?",
      [id]
    );
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Erro ao buscar produto por ID:", err);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

// Inicia o servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Servidor backend rodando na porta ${port}`);
  console.log(`🔗 Acesse: http://localhost:${port}`);
  console.log(`📦 API produtos: http://localhost:${port}/produtos`);
});
