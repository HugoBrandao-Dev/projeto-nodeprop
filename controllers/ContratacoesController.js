const express = require('express')
const router = express.Router()

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/contratacoes', (req, res) => {
  res.render('admin/contratacoes/contratacoesList')
})

router.get('/admin/contratacao/nova', (req, res) => {
  res.render('admin/contratacoes/contratacaoCadastrar')
})

module.exports = router