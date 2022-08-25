const express = require('express')
const router = express.Router()

router.get('/clientes', (req, res) => {
  res.render('clientes')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/clientes', (req, res) => {
  res.render('admin/clientes/clientesList')
})

module.exports = router