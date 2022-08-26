const express = require('express')
const router = express.Router()

router.get('/servicos', (req, res) => {
  res.render('servicos')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/servicos', (req, res) => {
  res.render('admin/servicos/servicosList')
})

module.exports = router