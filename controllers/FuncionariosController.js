const express = require('express')
const router = express.Router()
const database = require('../database/connection')
const validator = require('validator')

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/funcionarios', (req, res) => {
  res.render('admin/funcionarios/funcionariosList')
})

router.get('/admin/funcionario/novo', (req, res) => {
  res.render('admin/funcionarios/funcionarioCadastrar')
})

router.get('/admin/funcionarios/opcoes', (req, res) => {
  // Mensagens de erro.
  let setorError = req.flash('setorError')
  let cargoSetorError = req.flash('cargoSetorError')
  let cargoError = req.flash('cargoError')
  let salarioError = req.flash('salarioError')

  let erros = {
    setorError,
    cargoSetorError,
    cargoError,
    salarioError
  }

  database.select().table("setores")
    .then(setores => {
      database.select().table('cargos')
        .then(cargos => {
          res.render('admin/funcionarios/funcionarioOpcoes', {
            setores,
            cargos,
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
  let setor = req.body.iptSetor.trim()

  let setorOK = validator.isAlpha(setor, ['pt-BR'], {
    ignore: ' '
  })

  let setorError = null

  if (!setorOK) {
    setorError = 'SETOR inválido ou preenchido de forma incorreta.'
    req.flash('setorError', setorError)
  }

  if (setorError) {
    res.redirect('/admin/funcionarios/opcoes')
  } else {
    database.insert({ setor }).into("setores")
    .then(response => {
      res.redirect('/admin/funcionarios/opcoes')
    })
    .catch(error => {
      console.log(error)
    })
  }
})

router.post('/admin/funcionario/setor/deletar', (req, res) => {
  let id = req.body.iptId

  database.select().table("cargos").where({ setor_id: id })
    .then(setores => {
      if (setores.length == 0) {
        database.delete().table("setores").where({ id })
          .then(response => {
            res.redirect('/admin/funcionarios/opcoes')
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        res.send('ERRO: Há CARGOS que dependem deste setor.')
      }
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/admin/funcionarios/cargo/salvarNovo', (req, res) => {
  let cargoSetor = req.body.iptSetor
  let cargo = req.body.iptCargo
  let salario = req.body.iptSalario

  let cargoSetorOK = validator.isInt(cargoSetor)
  let cargoOK = validator.isAlpha(cargo, ['pt-BR'], {
    ignore: ' '
  })
  let salarioOK = validator.isFloat(salario, ['pt-BR'], {
    min: 0,
    max: 500000
  })

  let cargoSetorError = null
  let cargoError = null
  let salarioError = null

  if (!cargoSetorOK) {
    cargoSetorError = 'SETOR inválido ou preenchido de forma incorreta.'
  }
  if (!cargoOK) {
    cargoError = 'CARGO inválido.'
  }
  if (!salarioOK) {
    salarioError = 'SALÁRIO inválido.'
  }

  if (cargoSetorError || cargoError || salarioError) {
    req.flash('cargoSetorError', cargoSetorError)
    req.flash('cargoError', cargoError)
    req.flash('salarioError', salarioError)

    req.flash('cargoSetor', cargoSetor)
    req.flash('cargo', cargo)
    req.flash('salario', salario)

    res.redirect('/admin/funcionarios/opcoes')
  } else {
    database.insert({
      cargo,
      setor_id: cargoSetor,
      salario: parseFloat(parseFloat(salario).toFixed(2))
    }).table("cargos")
    .then(response => {
      res.redirect('/admin/funcionarios/opcoes')
    })
    .catch(error => {
      console.log(error)
    })
  }
})

router.post('/admin/funcionario/cargo/deletar', (req, res) => {
  let id = req.body.iptId

  database.select().table("funcionarios").where({ cargo_id: id })
    .then(funcionarios => {
      if (funcionarios.length == 0) {
        database.delete().table("cargos").where({ id })
          .then(cargos => {
            res.redirect("/admin/funcionarios/opcoes")
          })
          .catch(error => {
            console.log(error)
          }) 
      } else {
        res.send('ERRO: Há funcionarios que ocupam este CARGOS.')
      }
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router