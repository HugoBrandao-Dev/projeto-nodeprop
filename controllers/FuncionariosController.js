const express = require('express')
const router = express.Router()

/* ROTAS DO ADMINISTRADOR */

router.get('/admin/funcionarios', (req, res) => {
  res.render('admin/funcionarios/funcionariosList')
})

module.exports = router