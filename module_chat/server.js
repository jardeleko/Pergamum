const express = require('express')
const path = require('path')
const PORT = 8080
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index')
})

let messages = []

io.on('connection', socket => {
    console.log(`socket conectado: ${socket.id}`)
	socket.emit('previousMessage', messages)
    
    socket.on('sendMessage', data => {
		messages.push(data)
		socket.broadcast.emit('receivedMessage', data)
    })
})

server.listen(PORT)
console.log("http://localhost:"+PORT)  
