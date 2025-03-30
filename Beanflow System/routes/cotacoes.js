const express = require('express');
const pool = require('../db');
const router = express.Router();

// Listar todas as cotações
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM cotacoes");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Criar uma nova cotação
router.post('/', async (req, res) => {
    const { data_criacao, status, prazo, observacoes } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO cotacoes (data_criacao, status, prazo, observacoes) VALUES ($1, $2, $3, $4) RETURNING *",
            [data_criacao, status, prazo, observacoes]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
