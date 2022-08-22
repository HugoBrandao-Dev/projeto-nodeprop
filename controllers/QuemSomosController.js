const express = require('express')
const router = express.Router()

router.get('/quem-somos', (req, res) => {
  res.render('quem_somos')
})

module.exports = router