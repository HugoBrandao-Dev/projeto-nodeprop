const express = require('express')
const router = express.Router()

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/contratacoes', (req, res) => {
  res.render('admin/contratacoes/contratacoesList')
})

router.get('/admin/contratacao/nova', (req, res) => {
  res.render('admin/contratacoes/contratacaoCadastrar')
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

module.exports = router