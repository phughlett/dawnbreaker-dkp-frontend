const express = require('express')
const https = require('https')
const http = require('http')


const PORT = 80;


const app = express();

app.use(express.static('./build'))


app.get('/*', function(req,res) {
  res.sendFile('/app/build/index.html');
});


app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});
server.listen(80);

http.createServer(app).listen(80)
// https.createServer(options, app).listen(443, HOST)


// app.listen(PORT,() =>{
//  console.log(`Listening on ${PORT}`)
// })