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

app.get('/', (req, res) =>  {
  res.render('index.html')
})

app.get('/chat', (req, res) => {
	res.render('routes/home.html')
})

app.listen(PORT, () => {
  console.log("Servidor rodando na url http://localhost:"+PORT)  
})
