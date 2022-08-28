const express = require('express')
const router = express.Router()

router.get('/blog', (req, res) => {
  res.render('blog')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/artigos', (req, res) => {
  res.render('admin/artigos/artigosList')
})

module.exports = router