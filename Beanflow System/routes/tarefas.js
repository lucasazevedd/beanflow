const express = require('express');
const pool = require('../db');
const router = express.Router();

// Listar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tarefas");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Criar uma nova tarefa
router.post('/', async (req, res) => {
    const { descricao, prazo, responsavel } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO tarefas (descricao, prazo, responsavel) VALUES ($1, $2, $3) RETURNING *",
            [descricao, prazo, responsavel]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
