const express = require('express')
const router = express.Router()

router.get('/servicos', (req, res) => {
  res.render('servicos')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/servicos', (req, res) => {
  res.render('admin/servicos/servicosList')
})

router.get('/admin/servico/novo', (req, res) => {
  res.render('admin/servicos/servicoCadastrar')
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

module.exports = router