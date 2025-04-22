const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET todos os clientes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM clientes");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET cliente por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Cliente não encontrado" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST novo cliente
router.post('/', async (req, res) => {
    const { nome, razao_social, cnpj, telefone, email } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO clientes (nome, razao_social, cnpj, telefone, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nome, razao_social, cnpj, telefone, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT (atualizar cliente)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, razao_social, cnpj, telefone, email } = req.body;
    try {
        const result = await pool.query(
            "UPDATE clientes SET nome = $1, razao_social = $2, cnpj = $3, telefone = $4, email = $5 WHERE id = $6 RETURNING *",
            [nome, razao_social, cnpj, telefone, email, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: "Cliente não encontrado" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM clientes WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Cliente não encontrado" });
        res.json({ message: "Cliente excluído com sucesso", cliente: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

