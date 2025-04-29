const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Criar mensagens
router.post('/', (req, res) => {
    const { conteudo } = req.body;
    db.run("INSERT INTO mensagens (conteudo) VALUES (?)", [conteudo], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, conteudo });
    });
});

// Listar todas as mensagens
router.get('/', (req, res) => {
    db.all("SELECT * FROM mensagens", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Pegar uma mensagem por ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM mensagens WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Mensagem não encontrada" });
        res.json(row);
    });
});

// Mudar mensagens insanas
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { conteudo } = req.body;
    db.run("UPDATE mensagens SET conteudo = ? WHERE id = ?", [conteudo, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Mensagem não encontrada" });
        res.json({ id, conteudo });
    });
});

// Deletar
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM mensagens WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Mensagem não encontrada" });
        res.json({ message: "Mensagem deletada com sucesso." });
    });
});

module.exports = router;
