const express = require('express')
const router = express.Router()
const database = require('../database/connection')
const validator = require('validator')

// Função para tratamento do relacionamento (dados) entre as tabelas Funcionarios, Servicos, Funcionarios_Servicos.
const getFuncionariosServicosFormatados = require('../public/js/getFuncionariosServicosFormatados.js')

router.get('/servicos', (req, res) => {
  res.render('servicos')
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/servicos', (req, res) => {
  database.select([
    "servicos.id",
    "funcionarios_servicos.funcionario_id",
    "servico",
    "funcionarios.nome"
  ]).table("servicos")
    .innerJoin("funcionarios_servicos", "funcionarios_servicos.servico_id", "servicos.id")
    .innerJoin("funcionarios", "funcionarios_servicos.funcionario_id", "funcionarios.id")
      .then(resultado => {
        let registros = getFuncionariosServicosFormatados(resultado)
        
        res.render('admin/servicos/servicosList', { registros })
      })
      .catch(error => {
        console.log(error)
      })
})

router.get('/admin/servico/novo', (req, res) => {
  database.select([
    "funcionarios.id AS funcionarioId",
    "nome",
    "cargo"
  ]).table("funcionarios")
  .innerJoin("cargos", "cargos.id", "funcionarios.cargo_id")
    .then(funcionarios => {

      // Erros
      let servicoError = req.flash('servicoError')
      let responsaveisError = req.flash('responsaveisError')
      let informacoesError = req.flash('informacoesError')

      // Dados
      let servico = req.flash('servico')
      let responsaveis = req.flash('responsaveis')
      let informacoes = req.flash('informacoes')

      let erros = {
        servicoError,
        responsaveisError,
        informacoesError
      }

      let dados = {
        servico,
        responsaveis,
        informacoes
      }

      res.render('admin/servicos/servicoCadastrar', {
        funcionarios,
        erros,
        dados
      })
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/admin/servico/salvarNovo', (req, res) => {
  let servico = req.body.iptServico.trim()

  // O flash da bug, quando se passa um [] (vazio) via req.flash()
  let responsaveis = req.body.iptResponsaveis || ''
  let informacoes = req.body.iptInformacoes.trim()

  let servicoOK = validator.isAlpha(servico, ['pt-BR'], {
    ignore: ' ,.:;?()\''
  })
  let responsaveisOK = true
  if (responsaveis == '') {
    responsaveisOK = false
  } else if (!Array.isArray(responsaveis)) {
    if (!isNaN(responsaveis)) {
      responsaveis = [...responsaveis]
    } else {
      responsaveisOK = false
    }
  }

  let informacoesOK = validator.isAlpha(informacoes, ['pt-BR'], {
    ignore: ' ,.:;?()\''
  })

  let servicoError = null
  let responsaveisError = null
  let informacoesError = null

  if (!servicoOK) {
    servicoError = "SERVICO inválido ou preenchido de forma incorreta."
  }
  if (!responsaveisOK) {
    responsaveisError = "RESPONSAVEIS inválido ou preenchido de forma incorreta."
  }
  if (!informacoesOK) {
    informacoesError = "INFORMACOES inválido ou preenchido de forma incorreta."
  }
 
  if (servicoError || responsaveisError || informacoesError) {
    // Erros
    req.flash('servicoError', servicoError)
    req.flash('responsaveisError', responsaveisError)
    req.flash('informacoesError', informacoesError)

    // Dados
    req.flash('servico', servico)
    req.flash('responsaveis', responsaveis)
    req.flash('informacoes', informacoes)

    res.redirect('/admin/servico/novo')
  } else {
    database.insert({
      servico,
      informacoes_adicionais: informacoes
    }).table("servicos")
      .then(servicoId => {
        responsaveis.forEach(responsavel => {
          database.insert({
            funcionario_id: parseInt(responsavel),
            servico_id: servicoId
          }).table("funcionarios_servicos")
          .then(() => {})
          .catch(error => {
            console.log(error)
          })
        })
        res.render('admin/servicos/servicosList')
      })
      .catch(error => {
        console.log(error)
      })
  }
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