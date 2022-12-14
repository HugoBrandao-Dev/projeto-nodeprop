const express = require('express')
const router = express.Router()
const database = require('../database/connection')
const validator = require('validator')
const axios = require('axios')

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/funcionarios', (req, res) => {
  database.select(["funcionarios.id AS funcionarioId", "nome", "email", "celular", "cargo_id", "cargo"]).table("funcionarios")
    .innerJoin("cargos", "cargos.id", "funcionarios.cargo_id")
      .then(funcionarios => {
        res.render('admin/funcionarios/funcionariosList', { funcionarios })
      })
      .catch(error => {
        console.log(error)
      })
})

router.get('/admin/funcionario/novo', (req, res) => {
  axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response => {
      let ufs = response.data
      database.select().table("setores")
        .then(setores => {
          database.select().table("cargos")
            .then(cargos => {

              // Recepção de erros
              let nomeError = req.flash('nomeError')
              let nascimentoError = req.flash('nascimentoError')
              let emailError = req.flash('emailError')
              let setorError = req.flash('setorError')
              let cargoError = req.flash('cargoError')
              let telefoneError = req.flash('telefoneError')
              let celularError = req.flash('celularError')
              let cepError = req.flash('cepError')
              let ufError = req.flash('ufError')
              let localizacaoError = req.flash('localizacaoError')
              let enderecoError = req.flash('enderecoError')
              let numeroError = req.flash('numeroError')
              let informacoesError = req.flash('informacoesError')
              let cpfError = req.flash('cpfError')

              let erros = {
                nomeError,
                nascimentoError,
                emailError,
                setorError,
                cargoError,
                telefoneError,
                celularError,
                cepError,
                ufError,
                localizacaoError,
                enderecoError,
                numeroError,
                informacoesError,
                cpfError
              }

              // Recepção de dados
              let nome = req.flash('nome')
              let nascimento = req.flash('nascimento')
              let email = req.flash('email')
              let setor = req.flash('setor')
              let cargo = req.flash('cargo')
              let telefone = req.flash('telefone')
              let celular = req.flash('celular')
              let cep = req.flash('cep')
              let uf = req.flash('uf')
              let localizacao = req.flash('localizacao')
              let endereco = req.flash('endereco')
              let numero = req.flash('numero')
              let informacoes = req.flash('informacoes')
              let cpf = req.flash('cpf')

              let dados = {
                nome,
                nascimento,
                email,
                setor,
                cargo,
                telefone,
                celular,
                cep,
                uf,
                localizacao,
                endereco,
                numero,
                informacoes,
                cpf
              }

              res.render('admin/funcionarios/funcionarioCadastrar', { ufs, setores, cargos, erros, dados })
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

router.get('/admin/funcionarios/opcoes', (req, res) => {
  // Mensagens de erro.
  let setorError = req.flash('setorError')
  let cargoError = req.flash('cargoError')
  let salarioError = req.flash('salarioError')

  let erros = {
    setorError,
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
  let nome = req.body.iptNome.trim()
  let nascimento = req.body.iptNascimento
  let email = req.body.iptEmail
  let setor = req.body.iptSetor
  let cargo = req.body.iptCargo
  let telefone = req.body.iptTelefone
  let celular = req.body.iptCelular
  let cep = req.body.iptCEP
  let uf = req.body.iptUF
  let localizacao = req.body.iptLocalizacao.trim()
  let endereco = req.body.iptEndereco.trim()
  let numero = req.body.iptNumero
  let informacoes = req.body.iptInformacoes.trim()
  let cpf = req.body.iptCPF.trim()

  let nomeOK = validator.isAlpha(nome, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let nascimentoOK = validator.isDate(nascimento)
  let emailOK = validator.isEmail(email)
  let setorOK = validator.isInt(setor, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let cargoOK = validator.isInt(cargo, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let telefoneOK = validator.isMobilePhone(telefone, ['pt-BR'])
  let celularOK = validator.isMobilePhone(celular, ['pt-BR'])
  let cepOK = validator.isPostalCode(cep, ['BR'])
  let ufOK = validator.isInt(uf)
  let localizacaoOK = validator.isAlpha(localizacao, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let enderecoOK = validator.isAlpha(endereco, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let numeroOK = validator.isInt(numero)
  let informacoesOK = validator.isAlpha(informacoes, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let cpfOK = validator.isInt(cpf)

  let nomeError = null
  let nascimentoError = null
  let emailError = null
  let setorError = null
  let cargoError = null
  let telefoneError = null
  let celularError = null
  let cepError = null
  let ufError = null
  let localizacaoError = null
  let enderecoError = null
  let numeroError = null
  let informacoesError = null
  let cpfError = null

  if (!nomeOK) {
    nomeError = 'NOME inválido ou preenchido de forma incorreta.'
  }
  if (!nascimentoOK) {
    nascimentoError = 'NASCIMENTO inválido ou preenchido de forma incorreta.'
  }
  if (!emailOK) {
    emailError = 'EMAIL inválido ou preenchido de forma incorreta.'
  }
  if (!setorOK) {
    setorError = 'SETOR inválido ou preenchido de forma incorreta.'
  }
  if (!cargoOK) {
    cargoError = 'CARGO inválido ou preenchido de forma incorreta.'
  }
  if (!telefoneOK) {
    telefoneError = 'TELEFONE inválido ou preenchido de forma incorreta.'
  }
  if (!celularOK) {
    celularError = 'CELULAR inválido ou preenchido de forma incorreta.'
  }
  if (!cepOK) {
    cepError = 'CEP inválido ou preenchido de forma incorreta.'
  }
  if (!ufOK) {
    ufError = 'UF inválido ou preenchido de forma incorreta.'
  }
  if (!localizacaoOK) {
    localizacaoError = 'LOCALIZACAO inválido ou preenchido de forma incorreta.'
  }
  if (!enderecoOK) {
    enderecoError = 'ENDERECO inválido ou preenchido de forma incorreta.'
  }
  if (!numeroOK) {
    numeroError = 'NÚMERO inválido ou preenchido de forma incorreta.'
  }
  if (!informacoesOK) {
    informacoesError = 'INFORMACOES inválido ou preenchido de forma incorreta.'
  }
  if (!cpfOK) {
    cpfError = 'CPF inválido ou preenchido de forma incorreta.'
  }

  if (nomeError || nascimentoError || emailError || setorError || cargoError || telefoneError || celularError || cepError || ufError || localizacaoError || enderecoError || numeroError || informacoesError || cpfError) {

    // Envio de erros
    req.flash('nomeError', nomeError)
    req.flash('nascimentoError', nascimentoError)
    req.flash('emailError', emailError)
    req.flash('setorError', setorError)
    req.flash('cargoError', cargoError)
    req.flash('telefoneError', telefoneError)
    req.flash('celularError', celularError)
    req.flash('cepError', cepError)
    req.flash('ufError', ufError)
    req.flash('localizacaoError', localizacaoError)
    req.flash('enderecoError', enderecoError)
    req.flash('numeroError', numeroError)
    req.flash('informacoesError', informacoesError)
    req.flash('cpfError', cpfError)

    // Envio de dados
    req.flash('nome', nome)
    req.flash('nascimento', nascimento)
    req.flash('email', email)
    req.flash('setor', setor)
    req.flash('cargo', cargo)
    req.flash('telefone', telefone)
    req.flash('celular', celular)
    req.flash('cep', cep)
    req.flash('uf', uf)
    req.flash('localizacao', localizacao)
    req.flash('endereco', endereco)
    req.flash('numero', numero)
    req.flash('informacoes', informacoes)
    req.flash('cpf', cpf)

    res.redirect('/admin/funcionario/novo')
  } else {
    database.insert({
      nome: nome.toLowerCase(),
      nascimento,
      email,
      setor_id: setor,
      cargo_id: cargo,
      telefone,
      celular,
      cep: cep.split('-').join(''),
      uf,
      localizacao,
      endereco,
      numero,
      informacoes_adicionais: informacoes,
      cpf
    }).table("funcionarios")
      .then(response => {
        res.redirect('/admin/funcionarios')
      })
      .catch(error => {
        console.log(error)
      })
  }
})

router.get('/admin/funcionario/edit/:id', (req, res) => {
  let id = req.params.id

  axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response => {
      let ufs = response.data
      database.select().table("funcionarios").where({ id })
        .then(funcionarioArray => {
          let funcionario = funcionarioArray[0]
          if (funcionario.length != 0) {
            database.select().table("setores")
              .then(setores => {
                database.select().table("cargos")
                  .then(cargos => {

                  // Recepção de erros
                  let nomeError = req.flash('nomeError')
                  let nascimentoError = req.flash('nascimentoError')
                  let emailError = req.flash('emailError')
                  let setorError = req.flash('setorError')
                  let cargoError = req.flash('cargoError')
                  let telefoneError = req.flash('telefoneError')
                  let celularError = req.flash('celularError')
                  let cepError = req.flash('cepError')
                  let ufError = req.flash('ufError')
                  let localizacaoError = req.flash('localizacaoError')
                  let enderecoError = req.flash('enderecoError')
                  let numeroError = req.flash('numeroError')
                  let informacoesError = req.flash('informacoesError')
                  let cpfError = req.flash('cpfError')

                  let erros = {
                    nomeError,
                    nascimentoError,
                    emailError,
                    setorError,
                    cargoError,
                    telefoneError,
                    celularError,
                    cepError,
                    ufError,
                    localizacaoError,
                    enderecoError,
                    numeroError,
                    informacoesError,
                    cpfError
                  }

                  // Recepção de dados
                  let nome = req.flash('nome')
                  let nascimento = req.flash('nascimento')
                  let email = req.flash('email')
                  let setor = req.flash('setor')
                  let cargo = req.flash('cargo')
                  let telefone = req.flash('telefone')
                  let celular = req.flash('celular')
                  let cep = req.flash('cep')
                  let uf = req.flash('uf')
                  let localizacao = req.flash('localizacao')
                  let endereco = req.flash('endereco')
                  let numero = req.flash('numero')
                  let informacoes = req.flash('informacoes')
                  let cpf = req.flash('cpf')

                  let dados = {
                    nome,
                    nascimento,
                    email,
                    setor,
                    cargo,
                    telefone,
                    celular,
                    cep,
                    uf,
                    localizacao,
                    endereco,
                    numero,
                    informacoes,
                    cpf
                  }

                  res.render('admin/funcionarios/funcionarioEdit', { ufs, funcionario, setores, cargos, erros, dados })
                })
                .catch(error => {
                  console.log(error)
                })
              })
            .catch(error => {
              console.log(error)
            })
          } else {
            res.send('ERRO: Esse ID de funcionário não existe.')
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/admin/funcionario/salvarCadastrado', (req, res) => {
  let id = req.body.iptId
  let nome = req.body.iptNome.trim()
  let nascimento = req.body.iptNascimento
  let email = req.body.iptEmail
  let setor = req.body.iptSetor
  let cargo = req.body.iptCargo
  let telefone = req.body.iptTelefone
  let celular = req.body.iptCelular
  let cep = req.body.iptCEP
  let uf = req.body.iptUF
  let localizacao = req.body.iptLocalizacao.trim()
  let numero = req.body.iptNumero
  let endereco = req.body.iptEndereco.trim()
  let informacoes = req.body.iptInformacoes.trim()
  let cpf = req.body.iptCPF.trim()

  let nomeOK = validator.isAlpha(nome, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let nascimentoOK = validator.isDate(nascimento)
  let emailOK = validator.isEmail(email)
  let setorOK = validator.isInt(setor, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let cargoOK = validator.isInt(cargo, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let telefoneOK = validator.isMobilePhone(telefone, ['pt-BR'])
  let celularOK = validator.isMobilePhone(celular, ['pt-BR'])
  let cepOK = validator.isPostalCode(cep, ['BR'])
  let ufOK = validator.isInt(uf)
  let localizacaoOK = validator.isAlpha(localizacao, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let enderecoOK = validator.isAlpha(endereco, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let numeroOK = validator.isInt(numero)
  let informacoesOK = validator.isAlpha(informacoes, ['pt-BR'], {
    ignore: ' ,.:()\''
  })
  let cpfOK = validator.isInt(cpf)

  let nomeError = null
  let nascimentoError = null
  let emailError = null
  let setorError = null
  let cargoError = null
  let telefoneError = null
  let celularError = null
  let cepError = null
  let ufError = null
  let localizacaoError = null
  let numeroError = null
  let enderecoError = null
  let informacoesError = null
  let cpfError = null

  if (!nomeOK) {
    nomeError = 'NOME inválido ou preenchido de forma incorreta.'
  }
  if (!nascimentoOK) {
    nascimentoError = 'NASCIMENTO inválido ou preenchido de forma incorreta.'
  }
  if (!emailOK) {
    emailError = 'EMAIL inválido ou preenchido de forma incorreta.'
  }
  if (!setorOK) {
    setorError = 'SETOR inválido ou preenchido de forma incorreta.'
  }
  if (!cargoOK) {
    cargoError = 'CARGO inválido ou preenchido de forma incorreta.'
  }
  if (!telefoneOK) {
    telefoneError = 'TELEFONE inválido ou preenchido de forma incorreta.'
  }
  if (!celularOK) {
    celularError = 'CELULAR inválido ou preenchido de forma incorreta.'
  }
  if (!cepOK) {
    cepError = 'CEP inválido ou preenchido de forma incorreta.'
  }
  if (!ufOK) {
    ufError = 'UF inválido ou preenchido de forma incorreta.'
  }
  if (!localizacaoOK) {
    localizacaoError = 'LOCALIZACAO inválido ou preenchido de forma incorreta.'
  }
  if (!enderecoOK) {
    enderecoError = 'ENDERECO inválido ou preenchido de forma incorreta.'
  }
  if (!numeroOK) {
    numeroError = 'NUMERO inválido ou preenchido de forme incorreta.'
  }
  if (!informacoesOK) {
    informacoesError = 'INFORMACOES inválido ou preenchido de forma incorreta.'
  }
  if (!cpfOK) {
    cpfError = 'CPF inválido ou preenchido de forma incorreta.'
  }

  if (nomeError || nascimentoError || emailError || setorError || cargoError || telefoneError || celularError || cepError || ufError || localizacaoError || enderecoError || numeroError || informacoesError || cpfError) {

    // Envio de erros
    req.flash('nomeError', nomeError)
    req.flash('nascimentoError', nascimentoError)
    req.flash('emailError', emailError)
    req.flash('setorError', setorError)
    req.flash('cargoError', cargoError)
    req.flash('telefoneError', telefoneError)
    req.flash('celularError', celularError)
    req.flash('cepError', cepError)
    req.flash('ufError', ufError)
    req.flash('localizacaoError', localizacaoError)
    req.flash('numeroError', numeroError)
    req.flash('enderecoError', enderecoError)
    req.flash('informacoesError', informacoesError)
    req.flash('cpfError', cpfError)

    // Envio de dados
    req.flash('nome', nome)
    req.flash('nascimento', nascimento)
    req.flash('email', email)
    req.flash('setor', setor)
    req.flash('cargo', cargo)
    req.flash('telefone', telefone)
    req.flash('celular', celular)
    req.flash('cep', cep)
    req.flash('uf', uf)
    req.flash('localizacao', localizacao)
    req.flash('numero', numero)
    req.flash('endereco', endereco)
    req.flash('informacoes', informacoes)
    req.flash('cpf', cpf)

    res.redirect(`/admin/funcionario/edit/${ id }`)
  } else {
    database.update({
      nome: nome.toLowerCase(),
      nascimento,
      email,
      setor_id: setor,
      cargo_id: cargo,
      telefone,
      celular,
      cep: cep.split('-').join(''),
      uf,
      localizacao,
      numero,
      endereco,
      informacoes_adicionais: informacoes,
      cpf
    }).table("funcionarios").where({ id })
      .then(response => {
        res.redirect('/admin/funcionarios')
      })
      .catch(error => {
        console.log(error)
      })
  }
})

router.post('/admin/funcionario/deletar', (req, res) => {
  let id = req.body.iptId

  database.delete().table("funcionarios").where({ id })
    .then(response => {
      if (response != 0) {
        res.redirect('/admin/funcionarios')
      }
    })
    .catch(error => {
      console.log(error)
    })
})

router.get('/admin/funcionario/:id', (req, res) => {
  let id = req.params.id

  axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(ufs => {
      database.select([
        "funcionarios.id AS funcionarioId",
        "setores.id AS setorId",
        "cargos.id AS cargoId",
        "nome",
        "nascimento",
        "email",
        "telefone",
        "celular",
        "cep",
        "cpf",
        "uf",
        "localizacao",
        "informacoes_adicionais",
        "endereco",
        "cargo_id",
        "setor_id",
        "cargo",
        "setor"
        ]).table("funcionarios")
      .innerJoin("cargos", "cargos.id", "funcionarios.cargo_id")
      .innerJoin("setores", "setores.id", "funcionarios.setor_id")
      .where({ "funcionarios.id": id})
      .then(funcionarioArray => {
        let funcionario = funcionarioArray[0]

        // Captura a sigla do estado (UF) e a armazena dentro do Objeto funcionario.
        ufs.data.forEach(ufObject => {
          if (funcionario.uf == ufObject.id) {
            funcionario.uf = ufObject.sigla
          }
        })
        if (funcionarioArray.length == 1) {
          res.render('admin/funcionarios/funcionarioInfo', { funcionario })
        } else {
          res.send('ERRO: ID inválido de funcionário.')
        }
      })
      .catch(error => {
        console.log(error)
      })
    })
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
  let cargo = req.body.iptCargo
  let salario = req.body.iptSalario

  let cargoOK = validator.isAlpha(cargo, ['pt-BR'], {
    ignore: ' '
  })
  let salarioOK = validator.isFloat(salario, ['pt-BR'], {
    min: 0,
    max: 500000
  })

  let cargoError = null
  let salarioError = null

  if (!cargoOK) {
    cargoError = 'CARGO inválido.'
  }
  if (!salarioOK) {
    salarioError = 'SALÁRIO inválido.'
  }

  if (cargoError || salarioError) {
    req.flash('cargoError', cargoError)
    req.flash('salarioError', salarioError)

    req.flash('cargo', cargo)
    req.flash('salario', salario)

    res.redirect('/admin/funcionarios/opcoes')
  } else {
    database.insert({
      cargo,
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