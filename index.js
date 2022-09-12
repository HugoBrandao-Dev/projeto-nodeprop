const express = require('express')
var path = require('path');
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')

const app = express(express)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser('qweorisadfsad'))
app.use(session({
  secret: "eroiwsfsdfouqwur",
  cookie: {
    maxAge: 60000
  }
}))
app.use(flash())
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Controllers
const clientesController = require('./controllers/ClientesController')
const servicosController = require('./controllers/ServicosController')
const blogController = require('./controllers/blogController')
const quemSomosController = require('./controllers/QuemSomosController')
const contatosController = require('./controllers/ContatosController')
const funcionariosController = require('./controllers/FuncionariosController')
const contratacoesController = require('./controllers/ContratacoesController')
const newsletterController = require('./controllers/NewsletterController')

// Configuração dos Controllers
app.use('/', clientesController)
app.use('/', servicosController)
app.use('/', blogController)
app.use('/', quemSomosController)
app.use('/', contatosController)
app.use('/', funcionariosController)
app.use('/', contratacoesController)
app.use('/', newsletterController)

app.get('/', (req, res) => {
  // Captura de erros
  let emailError = req.flash('emailError')

  let erros = {
    emailError
  }

  // Captura de dados
  let email = req.flash('email')

  let dados = {
    email
  }

  res.render('index', {
    erros,
    dados
  })
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