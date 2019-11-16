const express = require('express')
const path = require('path')
const PORT = 8080
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const route = require('route')

app.use(route);
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

io.on('/', socket => {
    console.log(`socket conectado: ${socket.id}`)
    console.log("entrou aqui")
})

server.listen(PORT)
console.log("http://localhost:"+PORT)  
