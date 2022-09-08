const express = require('express')
const router = express.Router()
const database = require('../database/connection')

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/contratacoes', (req, res) => {
  res.render('admin/contratacoes/contratacoesList')
})

router.get('/admin/contratacao/nova', (req, res) => {
  database.select().table("clientes")
    .then(table_clientes => {
      database.select().table("servicos")
        .then(table_servicos => {
          res.render('admin/contratacoes/contratacaoCadastrar', {
            table_clientes,
            table_servicos
          })
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/admin/contratacao/salvarNova', (req, res) => {
  let data = req.body.iptData
  let contratante = req.body.iptContratante
  let servico = req.body.iptServico

  res.send({
    data,
    contratante,
    servico
  })
})

router.get('/admin/contratacao/edit/:id', (req, res) => {
  let id = req.body.iptId
  res.render('admin/contratacoes/contratacaoEdit')
})

router.post('/admin/contratacao/salvarCadastrada', (req, res) => {
  let id = req.body.iptId
  let data = req.body.iptData
  let contratante = req.body.iptContratante
  let servico = req.body.iptServico

  res.send({
    id,
    data,
    contratante,
    servico
  })
})

router.post('/admin/contratacao/deletar', (req, res) => {
  let id = req.body.iptId
  res.send(`Registro ${ id } deletado com sucesso.`)
})

router.get('/admin/contratacao/:id', (req, res) => {
  let id = req.params.id

  res.render('admin/contratacoes/contratacaoInfo')
})

module.exports = router