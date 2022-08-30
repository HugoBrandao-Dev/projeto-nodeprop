const express = require('express')
const router = express.Router()

router.get('/blog', (req, res) => {
  res.render('blog')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/artigos', (req, res) => {
  res.render('admin/artigos/artigosList')
})

router.get('/admin/artigo/novo', (req, res) => {
  res.render('admin/artigos/artigoCadastrar')
})

router.post('/admin/artigo/salvarNovo', (req, res) => {
  let titulo = req.body.iptTitulo
  let categoria = req.body.iptCategoria
  let artigo = req.body.txtArtigo

  res.send({
    titulo,
    categoria,
    artigo
  })
})

router.get('/admin/artigos/categorias/nova', (req, res) => {
  res.render('admin/artigos/artigoOpcoes')
})

router.post('/admin/artigos/categorias/salvarNova', (req, res) => {
  let categoria = req.body.iptCategoria

  res.send({
    categoria
  })
})

module.exports = router