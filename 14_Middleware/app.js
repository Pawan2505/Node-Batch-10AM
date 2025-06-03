const { render } = require('ejs');
const express = require('express');
const path = require('path');

const port = 8001;

const app = express();

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use('/',express.static(path.join(__dirname,'/assets')));
console.log(path.join(__dirname,'/assets'))
// let data = {
//     username:'Pawan',
//     age:12
// }

app.use(function(req,res,next){
    req.username = 'Pawan';
    req.age = 25
    if(req.age >=18){
       next();
    }else{
        return res.render('404')
    }
})

app.get('/',(req,res)=>{
    return res.render('home',{
        username:req.username,
        age:req.age
    });
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }

    console.log("Server started at port :- ",port);
})

