const express =require('express')

const app = express();

app.use(express.static('./build'))


app.get('/*', function(req,res) {
  res.sendFile('/app/build/index.html');
});

app.listen(80, () =>{
 console.log('Listening on 80')
})