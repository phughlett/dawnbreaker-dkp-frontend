const express = require('express')

const PORT = 80;
const HOST = 'dawnbreaker.app'


const app = express();

app.use(express.static('./build'))


app.get('/*', function(req,res) {
  res.sendFile('/app/build/index.html');
});



app.listen(PORT, HOST, () =>{
 console.log(`Listening on ${PORT}`)
})