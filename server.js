const express =require('express')

const PORT = 80;


const app = express();

app.use(express.static('./build'))


app.get('/*', function(req,res) {
  res.sendFile('/app/build/index.html');
});



app.listen(PORT, () =>{
 console.log(`Listening on ${PORT}`)
})