const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const path = require('path')
const server = require('http').createServer(app)
var http = require('http')
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) =>  {
  res.render('index.html')
})

app.listen(PORT, () => {
  console.log("Servidor rodando na url http://localhost:"+PORT)  
})

