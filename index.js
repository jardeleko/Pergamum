const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
let React = require('react')
let ReactDOM = require('react-dom')
var http = require('http')
var fs  = require('fs')
const PORT = 1921
//if using path static app.use(express.static())
//app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) =>  {
  //i dont now, but this format maybe return renderized ok 
 ReactDOM.render('/routes/index.html')

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