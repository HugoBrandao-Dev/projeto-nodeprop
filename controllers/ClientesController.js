const express = require('express')
const router = express.Router()
const validator = require('validator')
const database = require('../database/connection')
const axios = require('axios')

router.get('/clientes', (req, res) => {
  database.select().table("clientes")
    .then(table_clientes => {
      res.render('clientes', { table_clientes })
    })
    .catch(error => {
      console.log(error)
    })
})

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/clientes', (req, res) => {
  database.select(["id", "nome", "email", "celular"]).table('clientes')
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
  // Para que o isAlpha() do validator aceite os espa??os em branco ENTRE o nome e os sobrenomes.
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
      ufError = 'O estado (UF) especificado est?? errado.'
    }
  })

  if (!nomeOK) {
    nomeError = 'NOME inv??lido ou preenchido de forma incorreta.'
  }
  if (!anoOK) {
    anoError = 'ANO DE NASCIMENTO/CRIA????O inv??lido ou preenchido de forma incorreta.'
  }
  if (!cepOK) {
    cepError = 'CEP inv??lido ou preenchido de forma incorreta.'
  }
  if (!emailOK) {
    emailError = 'EMAIL inv??lido ou preenchido de forma incorreta.'
  }
  if (!telefoneOK) {
    telefoneError = 'TELEFONE inv??lido ou preenchido de forma incorreta.'
  }
  if (!celularOK) {
    celularError = 'CELULAR inv??lido ou preenchido de forma incorreta.'
  }
  if (!localizacaoOK) {
    localizacaoError = 'LOCALIZA????O inv??lido ou preenchido de forma incorreta.'
  }
  if (!enderecoOK) {
    enderecoError = 'ENDERE??O inv??lido ou preenchido de forma incorreta.'
  }
  if (!numeroOK) {
    numeroError = 'N??MERO inv??lido ou preenchido de forma incorreta.'
  }
  if (!informacoesOK) {
    informacoesError = 'INFORMA????ES inv??lido ou preenchido de forma incorreta.'
  }
  if (!identificacaoOK) {
    identificacaoError = 'CPF/CNPJ inv??lido ou preenchido de forma incorreta.'
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
  database.select().where({id}).table("clientes")
    .then(resul => {
      let cliente = resul[0]
    
      // Erros
      let idError = req.flash('idError')
      let nomeError = req.flash('nomeError')
      let anoError = req.flash('anoError')
      let emailError = req.flash('emailError')
      let telefoneError = req.flash('telefoneError')
      let celularError = req.flash('celularError')
      let cepError = req.flash('cepError')
      let ufError = req.flash('ufError')
      let localizacaoError = req.flash('localizacaoError')
      let enderecoError = req.flash('enderecoError')
      let numeroError = req.flash('numeroError')
      let informacoesError = req.flash('informacoesError')
      let identificacaoError = req.flash('identificacaoError')

      let errors = {
        idError,
        nomeError,
        anoError,
        emailError,
        telefoneError,
        celularError,
        cepError,
        ufError,
        localizacaoError,
        enderecoError,
        numeroError,
        informacoesError,
        identificacaoError
      }

      // Dados
      let id = req.flash('id')
      let nome = req.flash('nome')
      let ano = req.flash('ano')
      let email = req.flash('email')
      let telefone = req.flash('telefone')
      let celular = req.flash('celular')
      let cep = req.flash('cep')
      let uf = req.flash('uf')
      let localizacao = req.flash('localizacao')
      let endereco = req.flash('endereco')
      let numero = req.flash('numero')
      let informacoes = req.flash('informacoes')
      let identificacao = req.flash('identificacao')

      let dados = {
        id,
        nome,
        ano,
        email,
        telefone,
        celular,
        cep,
        uf,
        localizacao,
        endereco,
        numero,
        informacoes,
        identificacao
      }
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => {
        res.render('admin/clientes/clienteEdit', { cliente, response, errors, dados })
      })
      .catch(error => {
        console.log(error)
      })
  })        
})

router.post('/admin/cliente/salvarEdicao', (req, res) => {
  let id = req.body.iptId
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

  let idOK = validator.isInt(id)
  let nomeOK = validator.isAlpha(nome, ['pt-BR'],{
    ignore: ' \''
  })
  let anoOK = validator.isDate(ano)
  let emailOK = validator.isEmail(email)
  let telefoneOK = validator.isMobilePhone(telefone, ['pt-BR']) || validator.isEmpty(telefone)
  let celularOK = validator.isMobilePhone(celular, ['pt-BR'])
  let cepOK = validator.isPostalCode(cep, 'BR')
  let localizacaoOK = validator.isAlphanumeric(localizacao, ['pt-BR'], {
    ignore: " ,.()-\':"
  })
  let enderecoOK = validator.isAlphanumeric(endereco, ['pt-BR'], {
    ignore: " ,.()-\':"
  })
  let numeroOK = validator.isInt(numero)
  let informacoesOK = validator.isAlphanumeric(informacoes, ['pt-BR'], {
    ignore: " ,.()-\':"
  }) || validator.isEmpty(informacoes)
  let identificacaoOK = validator.isInt(identificacao)

  let idError = null
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

  if (!idOK) {
    idError = 'ID inv??lido ou preenchido de forma incorreta.' 
  }
  if (!nomeOK) {
    nomeError = 'NOME inv??lido ou preenchido de forma incorreta.' 
  }
  if (!anoOK) {
    anoError = 'ANO DE NASCIMENTO/CRIA????O inv??lido ou preenchido de forma incorreta.' 
  }
  if (!emailOK) {
    emailError = 'EMAIL inv??lido ou preenchido de forma incorreta.'
  }
  if (!telefoneOK) {
    telefoneError = 'TELEFONE inv??lido ou preenchido de forma incorreta.'
  }
  if (!celularOK) {
    celularError = 'CELULAR inv??lido ou preenchido de forma incorreta.'
  }
  if (!cepOK) {
    cepError = 'CEP inv??lido ou preenchido de forma incorreta.'
  }
  axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ uf }`)
  .then(response => {
    let ufOK = validator.equals(uf, response.data.id)
    if (!ufOK) {
      ufError = 'O estado (UF) especificado est?? errado.'
    }
  })
  .catch(error => {
    console.log(error)
  })
  if (!localizacaoOK) {
    localizacaoError = 'LOCALIZA????O inv??lido ou preenchido de forma incorreta.'
  }
  if (!enderecoOK) {
    enderecoError = 'ENDERE??O inv??lido ou preenchido de forma incorreta.'
  }
  if (!numeroOK) {
    numeroError = 'N??MERO inv??lido ou preenchido de forma incorreta.'
  }
  if (!informacoesOK) {
    informacoesError = 'INFORMA????ES inv??lido ou preenchido de forma incorreta.'
  }
  if (!identificacaoOK) {
    identificacaoError = 'IDENTIFICA????O inv??lido ou preenchido de forma incorreta.'
  }

  // Mensagens de erro.
  req.flash('idError', idError)
  req.flash('nomeError', nomeError)
  req.flash('anoError', anoError)
  req.flash('emailError', emailError)
  req.flash('telefoneError', telefoneError)
  req.flash('celularError', celularError)
  req.flash('cepError', cepError)
  req.flash('ufError', ufError)
  req.flash('localizacaoError', localizacaoError)
  req.flash('enderecoError', enderecoError)
  req.flash('numeroError', numeroError)
  req.flash('informacoesError', informacoesError)
  req.flash('identificacaoError', identificacaoError)

  // Vari??veis a serem repassadas para o fron-end.
  req.flash('id', id)
  req.flash('nome', nome)
  req.flash('ano', ano)
  req.flash('email', email)
  req.flash('telefone', telefone)
  req.flash('celular', celular)
  req.flash('cep', cep)
  req.flash('uf', uf)
  req.flash('localizacao', localizacao)
  req.flash('endereco', endereco)
  req.flash('numero', numero)
  req.flash('informacoes', informacoes)
  req.flash('identificacao', identificacao)

  if (idError || nomeError || anoError || emailError || telefoneError || celularError || cepError || ufError || localizacaoError || enderecoError || numeroError || informacoesError || identificacaoError) {
    res.redirect(`/admin/cliente/edit/${ id }`)
  } else {
    database.where({ id }).update({
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
      identificacao
    }).table("clientes")
      .then(response => {
        res.redirect('/admin/clientes')
      })
      .catch(error => {
        console.log(error)
      })
  }
})

router.post('/admin/cliente/deletar', (req, res) => {
  let id = req.body.iptId
  database.delete().where({ id }).table("clientes")
    .then(response => {
      res.redirect('/admin/clientes')
    })
    .catch(error => {
      console.log(error)
    })
})

router.get('/admin/cliente/:id', (req, res) => {
  let id = req.params.id
  database.select().table("clientes").where({ id  })
    .then(resultado => {
      let cliente = resultado[0]

      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ cliente.uf }`)
        .then(response => {
          cliente.uf = response.data.sigla
          res.render('admin/clientes/clienteInfo', { cliente })
        })
        .catch(error => {
          console.log("Erro durante a pesquisa pelo identificador do estado (UF).")
        })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router