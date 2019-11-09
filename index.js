const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const server = require('http').createServer(app)
//let React = require('react')
//let ReactDOM = require('react-dom')
var http = require('http')
var fs  = require('fs')
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) =>  {
  //i dont now, but this format maybe return renderized ok 
  res.render('index.html')
})

app.listen(PORT, () => {
  console.log("Servidor rodando na url http://localhost:"+PORT)  
})

/*http.createServer(function (req, res) {
    fs.readFile('/routes/index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
}).listen(8080);
console.log("server in: http://localhost:8080")*/