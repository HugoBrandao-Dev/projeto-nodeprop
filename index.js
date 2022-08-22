const express = require('express')
const app = express(express)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Controllers
const clientesController = require('./controllers/ClientesController')
const servicosController = require('./controllers/ServicosController')

// Configuração dos Controllers
app.use('/', clientesController)
app.use('/', servicosController)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(8080, error => {
  if (error) {
    console.log('Servidor: [ Error ] => ' + error)
  } else {
    console.log('Servidor: [ OK ]')
  }
})