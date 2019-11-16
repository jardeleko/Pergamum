const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const path = require('path')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = 8888

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('io', io)

io.on('connection', socket => {
    console.log(`socket conectado: ${socket.id}`)
})

app.get('/', (req, res) =>  {
  res.render('index.html')
})

app.get('/chat', (req, res) => {
	res.render('html/home.html')
})

app.get('/create', (req, res) => {
	res.render('html/cadaster.html')
})

app.listen(PORT, () => {
  console.log("Servidor rodando na url http://localhost:"+PORT)  
})
