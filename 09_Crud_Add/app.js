const express = require('express');
const path = require('path');


const port = 8001;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))
// console.log(path.join(__dirname,'views'))

app.use(express.urlencoded()); // Jo form ka deta decrepted hai use incrept krke body object k andar daal dega.

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


app.post('/addPerson',(req,res)=>{
    // console.log(req.body);
    // let obj ={
    //     name: req.body.user_name,
    //     age: req.body.user_age
    // }
    data.push(req.body);
    return res.redirect("/");
})

app.get('/',(req,res)=>{
    return res.render("home", {
        data
    });
})

app.get('/about',(req,res)=>{
    return res.render('about');
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