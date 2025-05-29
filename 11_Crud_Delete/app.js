// const { log } = require('console');
// const express = require('express');
// const path = require('path');


// const port = 8001;

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname,'views'))
// // console.log(path.join(__dirname,'views'))

// app.use(express.urlencoded()); // Jo form ka deta decrepted hai use incrept krke body object k andar daal dega.

// const data = [
//     {
//         name:'Pawan',
//         age:25,  
//     },
//     {
//         name:'Manish',
//         age:21,
//     },
//     {
//         name:'Ram',
//         age:5,  
//     },
// ]


// app.get('/deletePerson/:pId', (req,res)=>{
//     console.log(req.params.pId)
//     data.splice(req.params.pId, 1);
//     return res.redirect('back');
// })


// app.post('/addPerson',(req,res)=>{
//     // console.log(req.body);
//     // let obj ={
//     //     name: req.body.user_name,
//     //     age: req.body.user_age
//     // }
//     data.push(req.body);
//     return res.redirect("/");
// })

// app.get('/',(req,res)=>{
//     return res.render("home", {
//         data
//     });
// })

// app.get('/about',(req,res)=>{
//     return res.render('about');
// })

// app.get('/*"*"',(req,res)=>{
//     return res.render('errors');
// })

// app.listen(port,(err)=>{
//     if(err){
//         console.log(err);
//         return false;
//     }
//     console.log("Server is started at port :- ", port);
// })

const express = require('express')

// const fs = require("fs");
const path = require('path');

const port = 8001;

const app = express();
app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname,'views'))

console.log(path.join(__dirname,'views'))

const data = [
    {
    name:"Pawan",
    age:25
    },
]

app.get('/deletePerson/:pId',(req,res)=>{
    console.log(req.params.pId);
    data.splice(req.params.pId,1);
    return res.redirect('/');

})

app.post('/addPerson', (req,res)=>{
    data.push(req.body);
    return res.redirect('/');
})

app.get('/',(req,res)=>{
    return res.render('home',{
        data
    });

})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server started at port :- ",port);
})