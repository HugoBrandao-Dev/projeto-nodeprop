const express = require('express')
const router = express.Router()
const database = require('../database/connection')
const validator = require('validator')

router.post('/newsletter/salvar', (req, res) => {
  let email = req.body.iptEmail

  let emailOK = validator.isEmail(email)

  let emailError = null

  if (!emailOK) {
    emailError = "EMAIL inválido ou preenchido de forma incorreta."
  }

  if (emailError) {

    // Emitindo erros
    req.flash('emailError', emailError)

    // Emitindo dados
    req.flash('email', email)

    res.redirect('/')
  } else {
    database.insert({
      email
    }).table("newsletter")
      .then(() => {
        res.redirect('/')
      })
      .catch(error => {
        if (error.sqlState == 23000) {
          res.send('OPS: Seu email já está cadastrado.')
        } else {
          console.log(error)
        }
      })
  }
})

module.exports = router