const express = require('express')
const router = express.Router()
const database = require('../database/connection')
const validator = require('validator')

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
  let autor = req.body.iptAutor
  let artigo = req.body.txtArtigo

  res.send({
    titulo,
    categoria,
    autor,
    artigo
  })
})

router.get('/admin/artigos/categorias/nova', (req, res) => {
  database.select().table('categorias')
    .then(table_artigos => {
      res.render('admin/artigos/artigoOpcoes', { table_artigos })
    })
})

router.post('/admin/artigos/categorias/salvarNova', (req, res) => {
  let categoria = req.body.iptCategoria

  let categoriaOK = validator.isAlpha(categoria, ['pt-BR'], {
    ignore: ' ,.:;?!()\''
  })

  let categoriaError = null

  if (!categoriaOK) {
    categoriaError = 'CATEGORIA inválida ou preenchida de forma incorreta.'
  } 

  if (categoriaError) {
    // Emitindo erros
    req.flash('categoriaError', categoriaError)

    // Emitindo dados
    req.flash('categoria', categoria)

    res.redirect('/admin/artigos/categorias/nova')
  } else {
    database.insert({ categoria }).table('categorias')
      .then(() => {
        res.redirect('/admin/artigos/categorias/nova')
      })
      .catch(error => {
        if (error.sqlState == 23000) {
          res.send('Erro: Já existe uma categoria com esse nome.')
        }
      })
  }
})

router.post('/admin/artigos/categoria/deletar', (req, res) => {
  let id = req.body.iptId

  database.select().table("artigos").where({ categoria_id: id })
    .then(table_artigos => {
      if (table_artigos.length == 0) {
        database.delete().table("categorias").where({ id })
          .then(() => {
            res.redirect('/admin/artigos/categorias/nova')
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        res.send('ERRO: Há artigos cadastrados com essa categoria.')
      }
    })
})

router.get('/admin/artigo/edit/:id', (req, res) => {
  let id = req.params.id
  res.render('admin/artigos/artigoEdit')
})

router.post('/admin/artigo/salvarCadastrado', (req, res) => {
  let titulo = req.body.iptTitulo
  let categoria = req.body.iptCategoria
  let autor = req.body.iptAutor
  let artigo = req.body.txtArtigo

  res.send({
    titulo,
    categoria,
    autor,
    artigo
  })
})

router.post('/admin/artigo/deletar', (req, res) => {
  let id = req.body.iptId
  res.send(`Registro ${ id } deletado com sucesso.`)
})

router.get('/admin/artigo/:id', (req, res) => {
  let id = req.params.iptId
  res.render('admin/artigos/artigoInfo')
})

module.exports = router