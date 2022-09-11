const express = require('express')
const router = express.Router()
const database = require('../database/connection')
const validator = require('validator')
const getData = require('../public/js/getData.js')

router.get('/blog', (req, res) => {
  res.render('blog')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/artigos', (req, res) => {
  res.render('admin/artigos/artigosList')
})

router.get('/admin/artigo/novo', (req, res) => {
  database.select().table("categorias")
    .then(table_categorias => {
      database.select().table("funcionarios")
        .then(table_funcionarios => {
          database.select().table("status_artigos")
            .then(table_status_artigos => {

              // Capturando erros
              let tituloError = req.flash('tituloError')
              let categoriaError = req.flash('categoriaError')
              let autorError = req.flash('autorError')
              let statusError = req.flash('statusError')
              let artigoError = req.flash('artigoError')

              let erros = {
                tituloError,
                categoriaError,
                autorError,
                statusError,
                artigoError
              }

              // Capturando dados
              let titulo = req.flash('titulo')
              let categoria = req.flash('categoria')
              let autor = req.flash('autor')
              let status = req.flash('status')
              let artigo = req.flash('artigo')

              let dados = {
                titulo,
                categoria,
                autor,
                status,
                artigo
              }

              res.render('admin/artigos/artigoCadastrar', {
                table_categorias,
                table_funcionarios,
                table_status_artigos,
                erros,
                dados
              })
            })
        })
    })
})

router.post('/admin/artigo/salvarNovo', (req, res) => {
  let titulo = req.body.iptTitulo.trim()
  let categoria = req.body.iptCategoria
  let autor = req.body.iptAutor
  let status = req.body.iptStatus
  let artigo = req.body.txtArtigo

  let tituloOK = validator.isAlphanumeric(titulo, ['pt-BR'], {
    ignore: ' ,.!?:;()\'+-_%$@=/*'
  })
  let categoriaOK = validator.isInt(categoria)
  let autorOK = validator.isInt(autor)
  let statusOK = validator.isInt(status)
  let artigoOK = !validator.isEmpty(artigo)

  let tituloError = null
  let categoriaError = null
  let autorError = null
  let statusError = null
  let artigoError = null

  if (!tituloOK) {
    tituloError = 'TITULO inválido ou preenchido de forma incorreta.'
  }
  if (!categoriaOK) {
    categoriaError = 'CATEGORIA inválido ou preenchido de forma incorreta.'
  }
  if (!autorOK) {
    autorError = 'AUTOR inválido ou preenchido de forma incorreta.'
  }
  if (!statusOK) {
    statusError = 'STATUS inválido ou preenchido de forma incorreta.'
  }
  if (!artigoOK) {
    artigoError = 'ARTIGO inválido ou preenchido de forma incorreta.'
  }

  if (tituloError || categoriaError || autorError || statusError || artigoError) {

    // Emitindo erros
    req.flash('tituloError', tituloError)
    req.flash('categoriaError', categoriaError)
    req.flash('autorError', autorError)
    req.flash('statusError', statusError)
    req.flash('artigoError', artigoError)

    // Emitindo dados
    req.flash('titulo', titulo)
    req.flash('categoria', categoria)
    req.flash('autor', autor)
    req.flash('status', status)
    req.flash('artigo', artigo)

    res.redirect('/admin/artigo/novo')
  } else {
    database.insert({
      data_publicacao: getData(),
      titulo,
      categoria_id: categoria,
      autor_id: autor,
      status_id: status,
      texto: autor
    }).table("artigos")
      .then(() => {
        res.redirect('/admin/artigos')
      })
      .catch(error => {
        console.log(error)
      })
  }
})

router.get('/admin/artigos/categorias/nova', (req, res) => {
  database.select().table('categorias')
    .then(table_categorias => {
      res.render('admin/artigos/artigoOpcoes', { table_categorias })
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

  database.select().table("artigos").where({ id })
    .then(table_artigos => {
      database.select().table("categorias")
       .then(table_categorias => {
          database.select().table("funcionarios")
            .then(table_funcionarios => {
              database.select().table("status_artigos")
               .then(table_status_artigos => {
                  let artigo = table_artigos[0]
                  res.render('admin/artigos/artigoEdit', {
                    artigo,
                    table_categorias,
                    table_funcionarios,
                    table_status_artigos
                  })
               })
            })
       })
    })
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