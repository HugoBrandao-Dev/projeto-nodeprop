const express = require('express')
const router = express.Router()
const database = require('../database/connection')

router.get('/servicos', (req, res) => {
  res.render('servicos')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/servicos', (req, res) => {
  res.render('admin/servicos/servicosList')
})

router.get('/admin/servico/novo', (req, res) => {
  database.select([
    "funcionarios.id AS funcionarioId",
    "nome",
    "cargo"
  ]).table("funcionarios")
  .innerJoin("cargos", "cargos.id", "funcionarios.cargo_id")
    .then(funcionarios => {
      res.render('admin/servicos/servicoCadastrar', {
        funcionarios
      })
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/admin/servico/salvarNovo', (req, res) => {
  let servico = req.body.iptServico
  let responsaveis = req.body.iptResponsaveis
  let informacoes = req.body.iptInformacoes

  res.send({
    servico,
    responsaveis,
    informacoes,
  })
})

router.get('/admin/servico/edit/:id', (req, res) => {
  res.render('admin/servicos/servicoEdit')
})

router.post('/admin/servico/salvarEdicao', (req, res) => {
  let id = req.body.iptId
  let servico = req.body.iptServico
  let responsaveis = req.body.iptResponsaveis
  let informacoes = req.body.iptInformacoes

  res.send({
    id,
    servico,
    responsaveis,
    informacoes,
  })
})

router.post('/admin/servico/deletar', (req, res) => {
  let id = req.body.iptId
  res.send(`Registro ${ id } deletado com sucesso.`)
})

router.get('/admin/servico/:id', (req, res) => {
  res.render('admin/servicos/servicoInfo')
})

module.exports = router