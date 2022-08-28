const express = require('express')
const router = express.Router()

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

module.exports = router