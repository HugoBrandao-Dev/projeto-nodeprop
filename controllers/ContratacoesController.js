const express = require('express')
const router = express.Router()
const database = require('../database/connection')
const validator = require('validator')

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/contratacoes', (req, res) => {
  database.select([
    "contratacoes.id AS contratacaoId",
    "nome AS cliente",
    "servico"
  ]).table("contratacoes")
    .innerJoin("servicos", "servicos.id", "contratacoes.servico_id")
    .innerJoin("clientes", "clientes.id", "contratacoes.cliente_id")
      .then(table_contratacoes => {
        res.render('admin/contratacoes/contratacoesList', { table_contratacoes })
      })
})

router.get('/admin/contratacao/nova', (req, res) => {
  database.select().table("clientes")
    .then(table_clientes => {
      database.select().table("servicos")
        .then(table_servicos => {

          // Capturando possíveis erros
          let dataError = req.flash('dataError')
          let contratanteError = req.flash('contratanteError')
          let servicoError = req.flash('servicoError')

          let erros = {
            dataError,
            contratanteError,
            servicoError
          }

          res.render('admin/contratacoes/contratacaoCadastrar', {
            table_clientes,
            table_servicos,
            erros
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

  let dataOK = validator.isDate(data)
  let contratanteOK = validator.isInt(contratante)
  let servicoOK = validator.isInt(servico)

  let dataError = null
  let contratanteError = null
  let servicoError = null

  if (!dataOK) {
    dataError = 'DATA inválido ou preenchido de forma incorreta.'
  }
  if (!contratanteOK) {
    contratanteError = 'CONTRATANTE inválido ou preenchido de forma incorreta.'
  }
  if (!servicoOK) {
    servicoError = 'SERVICO inválido ou preenchido de forma incorreta.'
  }

  if (dataError || contratanteError || servicoError) {
    req.flash('dataError', dataError)
    req.flash('contratanteError', contratanteError)
    req.flash('servicoError', servicoError)

    res.redirect('/admin/contratacao/nova')
  } else {
    database.insert({
      cliente_id: contratante,
      servico_id: servico,
      data
    }).table("contratacoes")
      .then(() => {
        res.redirect('/admin/contratacoes')
      })
      .catch(error => {
        console.log(error)
      })
  }
})

router.get('/admin/contratacao/edit/:id', (req, res) => {
  let id = req.params.id

  database.select().table("contratacoes").where({ id })
    .then(table_contratacoes => {
      database.select([
          "clientes.id AS clienteId",
          "nome"
        ]).table("clientes")
        .then(table_clientes => {
          database.select([
            "servicos.id AS servicoId",
            "servico"
          ]).table("servicos")
            .then(table_servicos => {
              let contratacao = table_contratacoes[0]
              res.render('admin/contratacoes/contratacaoEdit', {
                contratacao,
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
    .catch(error => {
      console.log(error)
    })
})

router.post('/admin/contratacao/salvarCadastrada', (req, res) => {
  let id = req.body.iptId
  let data = req.body.iptData
  let contratante = req.body.iptContratante
  let servico = req.body.iptServico

  let dataOK = validator.isDate(data)
  let contratanteOK = validator.isInt(contratante)
  let servicoOK = validator.isInt(servico)

  let dataError = null
  let contratanteError = null
  let servicoError = null

  if (!dataOK) {
    dataError = 'DATA inválido ou preenchido de forma incorreta.'
  }
  if (!contratanteOK) {
    contratanteError = 'CONTRATANTE inválido ou preenchido de forma incorreta.'
  }
  if (!servicoOK) {
    servicoError = 'SERVICO inválido ou preenchido de forma incorreta.'
  }

  if (dataError || contratanteError || servicoError) {
    req.flash('data', data)
    req.flash('contratante', contratante)
    req.flash('servico', servico)

    req.flash('dataError', dataError)
    req.flash('contratanteError', contratanteError)
    req.flash('servicoError', servicoError)

    res.redirect(`/admin/contratacao/edit/${ id }`)
  } else {
    database.update({
      cliente_id: contratante,
      servico_id: servico,
      data
    }).table("contratacoes").where({ id })
      .then(() => {
        res.redirect('/admin/contratacoes')
      })
      .catch(error => {
        console.log(error)
      })
  }
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