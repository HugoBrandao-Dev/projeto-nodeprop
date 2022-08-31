const express = require('express')
const router = express.Router()

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/contratacoes', (req, res) => {
  res.render('admin/contratacoes/contratacoesList')
})

module.exports = router