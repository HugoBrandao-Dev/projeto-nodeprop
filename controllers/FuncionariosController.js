const express = require('express')
const router = express.Router()
const database = require('../database/connection')

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/funcionarios', (req, res) => {
  res.render('admin/funcionarios/funcionariosList')
})

router.get('/admin/funcionario/novo', (req, res) => {
  res.render('admin/funcionarios/funcionarioCadastrar')
})

router.get('/admin/funcionarios/opcoes', (req, res) => {
  res.render('admin/funcionarios/funcionarioOpcoes')
})

router.post('/admin/funcionario/salvarNovo', (req,res) => {
let nome = req.body.iptNome
let nascimento = req.body.iptNascimento
let email = req.body.iptEmail
let setor = req.body.iptSetor
let cargo = req.body.iptCargo
let telefone = req.body.iptTelefone
let celular = req.body.iptCelular
let localizacao = req.body.iptLocalizacao
let endereco = req.body.iptEndereco
let informacoes = req.body.iptInformacoes
let cpf = req.body.iptCPF

  res.send({
    nome,
    nascimento,
    email,
    setor,
    cargo,
    telefone,
    celular,
    localizacao,
    endereco,
    informacoes,
    cpf
  })
})

router.get('/admin/funcionario/edit/:id', (req, res) => {
  res.render('admin/funcionarios/funcionarioEdit')
})

router.post('/admin/funcionario/salvarCadastrado', (req, res) => {
  let id = req.body.iptId
  let nome = req.body.iptNome
  let nascimento = req.body.iptNascimento
  let email = req.body.iptEmail
  let setor = req.body.iptSetor
  let cargo = req.body.iptCargo
  let telefone = req.body.iptTelefone
  let celular = req.body.iptCelular
  let localizacao = req.body.iptLocalizacao
  let endereco = req.body.iptEndereco
  let informacoes = req.body.iptInformacoes
  let cpf = req.body.iptCPF

  res.send({
    id,
    nome,
    nascimento,
    email,
    setor,
    cargo,
    telefone,
    celular,
    localizacao,
    endereco,
    informacoes,
    cpf
  })
})

router.post('/admin/funcionario/deletar', (req, res) => {
  let id = req.body.iptId
  res.send(`Registro ${ id } deletado com sucesso.`)
})

router.get('/admin/funcionario/:id', (req, res) => {
  res.render('admin/funcionarios/funcionarioInfo')
})

router.post('/admin/funcionarios/setor/salvarNovo', (req, res) => {
  let setor = req.body.iptSetor

  database.insert({ setor }).into("setores")
    .then(response => {
      res.redirect('/admin/funcionarios/opcoes')
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/admin/funcionarios/cargo/salvarNovo', (req, res) => {
  let setor = req.body.iptSetor
  let cargo = req.body.iptCargo
  let salario = parseFloat(parseFloat(req.body.iptSalario).toFixed(2))

  res.send({
    setor,
    cargo,
    salario
  })
})

module.exports = router