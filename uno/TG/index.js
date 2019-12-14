var express = require('express');
var app = express();
var jugadores = []
var bodyParser = require("body-parser")
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://Castellani:bologna91@cluster0-prmux.mongodb.net/test?retryWrites=true&w=majority";
var nombre_base_datos= "test";
var puerto = process.env.PORT || 3000

app.use(express.static("./publico"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/api/opinion', function (req, res) {
  res.json(jugadores);
});
app.post('/api/opinion', function (req, res) {
  var nombre = req.body.nombre 
  jugadores.push(nombre)
  var opinion = req.body.opinion
  jugadores.push(opinion)
  res.status(201).redirect("https://bruja.herokuapp.com/")
  
  MongoClient.connect(url, async function(err, client) {
    if (err) {
        console.log("error:" + JSON.stringify(err))
        process.exit(1)
    }
     console.log("Connected successfully to server");
     var db = client.db(nombre_base_datos);
    
     await db.collection('players').insertMany([ 
       {nombre: nombre, mejoraria: opinion }])
     console.log('se agrego un player')
 

     
     var players = await db.collection('players').find().toArray()
     console.log('los players son:' + JSON.stringify(players))
 
  
     client.close();
   });
 
});

app.listen(puerto, function () {
  console.log('Example app listening on port 3000!');
});
