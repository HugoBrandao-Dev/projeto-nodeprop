const express = require('express')
const router = express.Router()

router.get('/clientes', (req, res) => {
  res.render('clientes')
})

module.exports = router