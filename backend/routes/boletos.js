const express = require('express');
const pool = require('../db');
const router = express.Router();

// Listar todos os boletos
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM boletos");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Criar um novo boleto
router.post('/', async (req, res) => {
    const { data_criacao, vencimento, valor } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO boletos (data_criacao, vencimento, valor) VALUES ($1, $2, $3) RETURNING *",
            [data_criacao, vencimento, valor]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
