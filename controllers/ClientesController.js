const express = require('express')
const router = express.Router()

router.get('/clientes', (req, res) => {
  res.render('clientes')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/clientes', (req, res) => {
  res.render('admin/clientes/clientesList')
})

router.get('/admin/cliente/novo', (req, res) => {
  res.render('admin/clientes/clienteCadastrar')
})

router.post('/admin/cliente/salvarNovo', (req, res) => {
  let nome = req.body.iptNome
  let ano = req.body.iptAno
  let email = req.body.iptEmail

  let telefone = req.body.iptTelefone
  let celular = req.body.iptCelular

  let localizacao = req.body.iptLocalizacao
  let endereco = req.body.iptEndereco
  let informacoes = req.body.iptInformacoes
  let cpf = req.body.iptCPF

  res.send({
    nome,
    ano,
    email,
    telefone,
    celular,
    localizacao,
    endereco,
    informacoes,
    cpf
  })
})

router.get('/admin/cliente/edit/:id', (req, res) => {
  let id = req.params.id
  res.render('admin/clientes/clienteEdit')
})

router.post('/admin/cliente/deletar', (req, res) => {
  let id = req.body.iptId
  res.send(`Registro ${ id } deletado.`)
})

module.exports = router