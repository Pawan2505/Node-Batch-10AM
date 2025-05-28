const express = require('express');
const path = require('path');


const port = 8001;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))
// console.log(path.join(__dirname,'views'))

const data = [
    {
        name:'Pawan',
        age:25,  
    },
    {
        name:'Manish',
        age:21,
    },
    {
        name:'Ram',
        age:5,  
    },
]

let num = 20;

app.get('/',(req,res)=>{
    return res.render("home", {
        data
    });
})

app.get('/about',(req,res)=>{
    return res.render('about',{num});
})

app.get('/*"*"',(req,res)=>{
    return res.render('errors');
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server is started at port :- ", port);
})