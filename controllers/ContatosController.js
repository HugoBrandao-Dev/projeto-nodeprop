const express = require('express')
const router = express.Router()

router.get('/contatos', (req, res) => {
  res.render('contatos')
})

module.exports = router