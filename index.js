const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const path = require('path')
const server = require('http').createServer(app)
const PORT = 8888

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


/*
const express = require('express') 
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('views engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

app.listen(PORT, () => {
  console.log('server in http://localhost'+PORT)
})
*/