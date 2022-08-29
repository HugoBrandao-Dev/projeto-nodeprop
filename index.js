const express = require('express')
var path = require('path');

const app = express(express)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Controllers
const clientesController = require('./controllers/ClientesController')
const servicosController = require('./controllers/ServicosController')
const blogController = require('./controllers/blogController')
const quemSomosController = require('./controllers/QuemSomosController')
const contatosController = require('./controllers/ContatosController')
const funcionariosController = require('./controllers/FuncionariosController')

// Configuração dos Controllers
app.use('/', clientesController)
app.use('/', servicosController)
app.use('/', blogController)
app.use('/', quemSomosController)
app.use('/', contatosController)
app.use('/', funcionariosController)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/admin', (req, res) => {
  res.render('admin/index')
})

app.listen(8080, error => {
  if (error) {
    console.log('Servidor: [ Error ] => ' + error)
  } else {
    console.log('Servidor: [ OK ]')
  }
})