const express = require('express')
const router = express.Router()
const database = require('../database/connection')
const validator = require('validator')
const slugify = require('slugify')

// Função para tratamento do relacionamento (dados) entre as tabelas Funcionarios, Servicos, Funcionarios_Servicos.
const getFuncionariosServicosFormatados = require('../public/js/getFuncionariosServicosFormatados.js')

router.get('/servicos', (req, res) => {
  database.select().table("servicos")
    .then(table_servicos => {
      res.render('servicos', { table_servicos })
    })
    .catch(error => {
      console.log(error)
    })
})

router.get('/servico/:id', (req, res) => {
  let id = req.params.id

  database.select().table("servicos").where({ id })
    .then(table_servicos => {
      let servico = table_servicos[0]
      res.render('servico', { servico })
    })
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
      let breveDescricaoError = req.flash('breveDescricaoError')
      let responsaveisError = req.flash('responsaveisError')
      let informacoesError = req.flash('informacoesError')

      // Dados
      let servico = req.flash('servico')
      let breveDescricao = req.flash('breveDescricao')
      let responsaveis = req.flash('responsaveis')
      let informacoes = req.flash('informacoes')

      let erros = {
        servicoError,
        breveDescricaoError,
        responsaveisError,
        informacoesError
      }

      let dados = {
        servico,
        breveDescricao,
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
  let breveDescricao = req.body.iptBreveDescricao.trim()

  // O flash da bug, quando se passa um [] (vazio) via req.flash()
  let responsaveis = req.body.iptResponsaveis || ''
  let informacoes = req.body.iptInformacoes.trim()

  let servicoOK = validator.isAlpha(servico, ['pt-BR'], {
    ignore: ' ,.:;?()\''
  })
  let breveDescricaoOK = validator.isAlpha(breveDescricao, ['pt-BR'], {
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
  let breveDescricaoError = null
  let responsaveisError = null
  let informacoesError = null

  if (!servicoOK) {
    servicoError = "SERVICO inválido ou preenchido de forma incorreta."
  }
  if (!breveDescricaoOK) {
    breveDescricaoError = "BREVE DESCRICÃO inválido ou preenchido de forma incorreta."
  }
  if (!responsaveisOK) {
    responsaveisError = "RESPONSAVEIS inválido ou preenchido de forma incorreta."
  }
  if (!informacoesOK) {
    informacoesError = "INFORMACOES inválido ou preenchido de forma incorreta."
  }
 
  if (servicoError || breveDescricaoError || responsaveisError || informacoesError) {
    // Erros
    req.flash('servicoError', servicoError)
    req.flash('breveDescricaoError', breveDescricaoError)
    req.flash('responsaveisError', responsaveisError)
    req.flash('informacoesError', informacoesError)

    // Dados
    req.flash('servico', servico)
    req.flash('breveDescricao', breveDescricao)
    req.flash('responsaveis', responsaveis)
    req.flash('informacoes', informacoes)

    res.redirect('/admin/servico/novo')
  } else {
    let slug = slugify(servico.toLowerCase())

    database.insert({
      servico,
      slug,
      breve_descricao: breveDescricao,
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
        res.redirect('/admin/servicos')
      })
      .catch(error => {
        console.log(error)
      })
  }
})

router.get('/admin/servico/edit/:id', (req, res) => {
  let id = req.params.id

  database.select([
    "funcionarios.id AS funcionarioId",
    "servicos.id AS servicoId",
    "servico",
    "breve_descricao",
    "servicos.informacoes_adicionais AS informacoes",
    "nome"
  ]).table("servicos")
    .innerJoin("funcionarios_servicos", "funcionarios_servicos.servico_id", "servicos.id")
    .innerJoin("funcionarios", "funcionarios_servicos.funcionario_id", "funcionarios.id")
    .where({
      "servicos.id": id
    })
      .then(resultado => {
        let funcionarioServico = getFuncionariosServicosFormatados(resultado, 'servicoId')[0]
        database.select([
          "funcionarios.id AS funcionarioId",
          "nome",
          "cargo"
        ]).table("funcionarios")
          .innerJoin("cargos", "funcionarios.cargo_id", "cargos.id")
            .then(funcionariosCargos => {

              // Recepção dos erros
              let servicoError = req.flash('servicoError')
              let breveDescricaoError = req.flash('breveDescricaoError')
              let responsaveisError = req.flash('responsaveisError')
              let informacoesError = req.flash('informacoesError')

              let erros = {
                servicoError,
                breveDescricaoError,
                responsaveisError,
                informacoesError
              }

              // Recepção dos dados
              let servico = req.flash('servico')
              let breveDescricao = req.flash('breveDescricao')
              let responsaveis = req.flash('responsaveis')
              let informacoes = req.flash('informacoes')

              let dados = {
                servico,
                breveDescricao,
                responsaveis,
                informacoes
              }

              res.render('admin/servicos/servicoEdit', { 
                funcionarioServico,
                funcionariosCargos,
                erros,
                dados
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

router.post('/admin/servico/salvarEdicao', (req, res) => {
  let id = req.body.iptId
  
  let servico = req.body.iptServico.trim()
  let breveDescricao = req.body.iptBreveDescricao.trim()

  // O flash da bug, quando se passa um [] (vazio) via req.flash()
  let responsaveis = req.body.iptResponsaveis || ''
  let informacoes = req.body.iptInformacoes.trim()

  let servicoOK = validator.isAlpha(servico, ['pt-BR'], {
    ignore: ' ,.:;?()\''
  })
  let breveDescricaoOK = validator.isAlpha(breveDescricao, ['pt-BR'], {
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
  let breveDescricaoError = null
  let responsaveisError = null
  let informacoesError = null

  if (!servicoOK) {
    servicoError = "SERVICO inválido ou preenchido de forma incorreta."
  }
  if (!breveDescricaoOK) {
    breveDescricaoError = "BREVE DESCRIÇÃO inválido ou preenchido de forma incorreta."
  }
  if (!responsaveisOK) {
    responsaveisError = "RESPONSAVEIS inválido ou preenchido de forma incorreta."
  }
  if (!informacoesOK) {
    informacoesError = "INFORMACOES inválido ou preenchido de forma incorreta."
  }
 
  if (servicoError || breveDescricaoError || responsaveisError || informacoesError) {
    // Erros
    req.flash('servicoError', servicoError)
    req.flash('breveDescricaoError', breveDescricaoError)
    req.flash('responsaveisError', responsaveisError)
    req.flash('informacoesError', informacoesError)

    // Dados
    req.flash('servico', servico)
    req.flash('breveDescricao', breveDescricao)
    req.flash('responsaveis', responsaveis)
    req.flash('informacoes', informacoes)

    res.redirect(`/admin/servico/edit/${ id }`)
  } else {
    let slug = slugify(servico.toLowerCase())
    database.update({
      servico,
      slug,
      breve_descricao: breveDescricao,
      informacoes_adicionais: informacoes
    }).table("servicos").where({ id })
      .then(servicoId => {
        database.delete().table("funcionarios_servicos").where({ servico_id: id })
          .then(() => {
            responsaveis.forEach(responsavel => {
              database.insert({
                funcionario_id: parseInt(responsavel),
                servico_id: id
              }).table("funcionarios_servicos")
              .then(() => {})
              .catch(error => {
                console.log(error)
            })
            res.redirect('/admin/servicos')
          })
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
})

router.post('/admin/servico/deletar', (req, res) => {
  let id = req.body.iptId
  
  database.delete().table("servicos").where({ id })
    .then(() => {
      database.delete().table("funcionarios_servicos").where({ servico_id: id })
        .then(() => {
          res.redirect('/admin/servicos')
        })
    })
    .catch(error => {
      console.log(error)
    })
})

router.get('/admin/servico/:id', (req, res) => {
  let id = req.params.id

  database.select([
    "funcionarios_servicos.funcionario_id AS funcionarioId",
    "servicos.id",
    "breve_descricao",
    "nome",
    "servico",
    "servicos.informacoes_adicionais AS informacoes"
  ]).table("servicos")
    .innerJoin("funcionarios_servicos", "funcionarios_servicos.servico_id", "servicos.id")
    .innerJoin("funcionarios", "funcionarios_servicos.funcionario_id", "funcionarios.id")
    .where({ "servicos.id": id })
      .then(resposta => {
        let resultado = getFuncionariosServicosFormatados(resposta)[0]
        res.render('admin/servicos/servicoInfo', { resultado })
      })
      .catch(error => {
        console.log(error)
      })
})

module.exports = router