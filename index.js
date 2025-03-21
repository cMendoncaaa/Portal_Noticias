const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')


const path = require('path');

const app = express();

const Posts = require('../PortalNoticias/Posts.js');

mongoose.connect('mongodb+srv://root:CauaMM2553@cluster0.h28ec.mongodb.net/dankicode?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro na conexão:', err.message);
  });


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/',(req,res)=>{
    
    if(req.query.busca == null){
        Posts.find({}).sort({'_id': -1}).exec(function(err,posts){
         console.log(posts[0]);
         res.render('home',{});
        })
       
    }else{
        res.render('busca',{});
    }

  
});


app.get('/:slug',(req,res)=>{
    //res.send(req.params.slug);
    res.render('single',{});
})



app.listen(5000,()=>{
    console.log('server rodando!');
})