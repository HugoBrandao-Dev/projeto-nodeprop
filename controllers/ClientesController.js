const express = require('express')
const router = express.Router()

router.get('/clientes', (req, res) => {
  res.render('clientes')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/clientes', (req, res) => {
  res.render('admin/clientes/clientesList')
})

router.get('/admin/cliente/novo', (req, res) => {
  res.render('admin/clientes/clienteCadastrar')
})

module.exports = router