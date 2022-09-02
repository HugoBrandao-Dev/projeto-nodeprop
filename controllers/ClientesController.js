const express = require('express')
const router = express.Router()
const validator = require('validator')
const database = require('../database/connection')
const axios = require('axios')

router.get('/clientes', (req, res) => {
  res.render('clientes')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/clientes', (req, res) => {
  database.select().table('clientes')
    .then(clientes => {
      res.render('admin/clientes/clientesList', { clientes })
    })
})

router.get('/admin/cliente/novo', (req, res) => {
  axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response => {
      let nomeError = req.flash('nomeError')
      let anoError = req.flash('anoError')
      let cepError = req.flash('cepError')
      let ufError = req.flash('ufError')
      let emailError = req.flash('emailError')
      let telefoneError = req.flash('telefoneError')
      let celularError = req.flash('celularError')
      let localizacaoError = req.flash('localizacaoError')
      let enderecoError = req.flash('enderecoError')
      let numeroError = req.flash('numeroError')
      let informacoesError = req.flash('informacoesError')
      let identificacaoError = req.flash('identificacaoError')

      let nome = req.flash('nome')
      let ano = req.flash('ano')
      let cep = req.flash('cep')
      let uf = req.flash('uf')
      let email = req.flash('email')
      let telefone = req.flash('telefone')
      let celular = req.flash('celular')
      let localizacao = req.flash('localizacao')
      let endereco = req.flash('endereco')
      let numero = req.flash('numero')
      let informacoes = req.flash('informacoes')
      let identificacao = req.flash('identificacao')

      let errors = {
        nomeError,
        anoError,
        cepError,
        ufError,
        emailError,
        telefoneError,
        celularError,
        localizacaoError,
        enderecoError,
        numeroError,
        informacoesError,
        identificacaoError
      }

      let dados = {
        nome,
        ano,
        cep,
        uf,
        email,
        telefone,
        celular,
        localizacao,
        endereco,
        numero,
        informacoes,
        identificacao
      }

      res.render('admin/clientes/clienteCadastrar', { response, errors, dados })
    })
    .catch(error => {
      console.log(`Erro na busca pelas siglas dos estados. ${ error }.`)
    })
})

router.post('/admin/cliente/salvarNovo', (req, res) => {
  // Para que o isAlpha() do validator aceite os espaços em branco ENTRE o nome e os sobrenomes.
  let nome = req.body.iptNome.trim()

  let ano = req.body.iptAno
  let email = req.body.iptEmail
  let telefone = req.body.iptTelefone
  let celular = req.body.iptCelular
  let cep = req.body.iptCEP
  let uf = req.body.iptUF
  let localizacao = req.body.iptLocalizacao
  let endereco = req.body.iptEndereco
  let numero = req.body.iptNumero
  let informacoes = req.body.iptInformacoes
  let identificacao = req.body.iptIdentificacao

  let nomeOK = validator.isAlpha(nome, ['pt-BR'], {
    ignore: ' '
  })
  let anoOK = validator.isDate(ano)
  let emailOK = validator.isEmail(email)
  let telefoneOK = validator.isMobilePhone(telefone, ['pt-BR']) || validator.isEmpty(telefone)
  let celularOK = validator.isMobilePhone(celular, ['pt-BR'])
  let cepOK = validator.isPostalCode(cep,'BR')
  let localizacaoOK = validator.isAlpha(localizacao, ['pt-BR'], {
    ignore: ' .,:()-'
  })
  let enderecoOK = validator.isAlphanumeric(endereco, ['pt-BR'], {
    ignore: ' .,:()-'
  })
  let numeroOK = validator.isInt(numero)
  let informacoesOK = validator.isAlphanumeric(informacoes, ['pt-BR'], {
    ignore: ' .,:()-'
  }) || validator.isEmpty(informacoes)
  let identificacaoOK = validator.isInt(identificacao)

  let nomeError = null
  let anoError = null
  let emailError = null
  let telefoneError = null
  let celularError = null
  let cepError = null
  let ufError = null
  let localizacaoError = null
  let enderecoError = null
  let numeroError = null
  let informacoesError = null
  let identificacaoError = null
  
  axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ uf }`)
    .then(response => {
      let ufOK = validator.equals(uf, response.data.id)
      if (!ufOK) {
        ufError = 'O estado (UF) especificado está errado.'
      }
    })

  if (!nomeOK) {
    nomeError = 'NOME inválido ou preenchido de forma incorreta.'
  }
  if (!anoOK) {
    anoError = 'ANO DE NASCIMENTO/CRIAÇÃO inválido ou preenchido de forma incorreta.'
  }
  if (!cepOK) {
    cepError = 'CEP inválido ou preenchido de forma incorreta.'
  }
  if (!emailOK) {
    emailError = 'EMAIL inválido ou preenchido de forma incorreta.'
  }
  if (!telefoneOK) {
    telefoneError = 'TELEFONE inválido ou preenchido de forma incorreta.'
  }
  if (!celularOK) {
    celularError = 'CELULAR inválido ou preenchido de forma incorreta.'
  }
  if (!localizacaoOK) {
    localizacaoError = 'LOCALIZAÇÃO inválido ou preenchido de forma incorreta.'
  }
  if (!enderecoOK) {
    enderecoError = 'ENDEREÇO inválido ou preenchido de forma incorreta.'
  }
  if (!numeroOK) {
    numeroError = 'NÚMERO inválido ou preenchido de forma incorreta.'
  }
  if (!informacoesOK) {
    informacoesError = 'INFORMAÇÕES inválido ou preenchido de forma incorreta.'
  }
  if (!identificacaoOK) {
    identificacaoError = 'CPF/CNPJ inválido ou preenchido de forma incorreta.'
  }

  req.flash('nomeError', nomeError)
  req.flash('anoError', anoError)
  req.flash('cepError', cepError)
  req.flash('ufError', ufError)
  req.flash('emailError', emailError)
  req.flash('telefoneError', telefoneError)
  req.flash('celularError', celularError)
  req.flash('localizacaoError', localizacaoError)
  req.flash('enderecoError', enderecoError)
  req.flash('numeroError', numeroError)
  req.flash('informacoesError', informacoesError)
  req.flash('identificacaoError', identificacaoError)

  req.flash('nome', nome)
  req.flash('ano', ano)
  req.flash('cep', cep)
  req.flash('uf', uf)
  req.flash('email', email)
  req.flash('telefone', telefone)
  req.flash('celular', celular)
  req.flash('localizacao', localizacao)
  req.flash('endereco', endereco)
  req.flash('numero', numero)
  req.flash('informacoes', informacoes)
  req.flash('identificacao', identificacao)

  if (nomeError || anoError || cepError || emailError || telefoneError || celularError || localizacaoError || enderecoError || numeroError || informacoesError || identificacaoError) {
    res.redirect('/admin/cliente/novo')
  } else {
    database.insert({
      nome,
      nascimento: ano,
      email,
      telefone,
      celular,
      cep: cep.split('-').join(''),
      uf,
      localizacao,
      endereco,
      numero,
      informacoes_adicionais: informacoes,
      identificacao,
    }).table('clientes')
      .then(response => {
        res.redirect('/admin/clientes')
      })
      .catch(error => {
        console.log(error)
      })
  }
})

router.get('/admin/cliente/edit/:id', (req, res) => {
  let id = req.params.id
  res.render('admin/clientes/clienteEdit')
})

router.post('/admin/cliente/salvarEdicao', (req, res) => {
  let id = req.body.iptId
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
    id,
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

router.post('/admin/cliente/deletar', (req, res) => {
  let id = req.body.iptId
  res.send(`Registro ${ id } deletado.`)
})

router.get('/admin/cliente/:id', (req, res) => {
  let id = req.params.id
  res.render('admin/clientes/clienteInfo')
})

module.exports = router