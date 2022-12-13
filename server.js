const express = require('express')
const https = require('https')
const http = require('http')


const PORT = 80;
const HOST = 'dawnbreaker.app'


const app = express();

app.use(express.static('./build'))


app.get('/*', function(req,res) {
  res.sendFile('/app/build/index.html');
});


// http.createServer(app).listen(80, HOST)
// https.createServer(options, app).listen(443, HOST)


app.listen(PORT, HOST, () =>{
 console.log(`Listening on ${PORT}`)
})