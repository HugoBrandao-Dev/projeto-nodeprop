const express = require('express')
const router = express.Router()

router.get('/servicos', (req, res) => {
  res.render('servicos')
})

module.exports = router