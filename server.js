const express =require('express')
const https = require('https');
const fs = require('fs');

var key = fs.readFileSync('/app/selfsigned.key');
var cert = fs.readFileSync('/app/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

const app = express();

app.use(express.static('./build'))


app.get('/*', function(req,res) {
  res.sendFile('/app/build/index.html');
});

var server = https.createServer(options, app);

server.listen(443, () =>{
 console.log('Listening on 443')
})