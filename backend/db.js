require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões SSL com o Railway
  },
});

pool.connect()
  .then(() => console.log("✅ Conectado ao PostgreSQL no Railway!"))
  .catch(err => console.error("❌ Erro ao conectar ao PostgreSQL:", err));

module.exports = pool;
