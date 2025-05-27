// const express = require('express');

// const port = 8001;

// const app = express();


// app.get('/',function(req,res){
//     res.write("<h1>Hello Express</h1>");
//     res.end();
// })

// app.get('/about',function(req,res){
//     res.write("<h1>Hello About</h1>");
//     res.end();
// })

// app.get('/*"*"',function(req,res){
//     res.write("<h1>Page not found</h1>");
//     res.end();
// })

// app.listen(port,function(err){
//     if(err){
//         console.log(err);
//         return false;
//     }

//     console.log(`server start at port :- `,port);
// })



const express = require('express');
const fs = require('fs');

const port = 8001;

const app = express();


app.get('/',function(req,res){
    fs.readFile('./Views/Home.html', function(err,data){
        if(err){
            console.log("File not read properly!");
            return false;
        }

        res.end(data);

    })
    // res.write("<h1>Hello Express</h1>");
    // res.end();
})

app.get('/about',function(req,res){

    fs.readFile('./Views/About.html', function(err,data){
        if(err){
            console.log("File not read Properly!");
            return false;
        }
        res.end(data);
    })
    
    // res.write("<h1>Hello About</h1>");
    // res.end();
})

app.get('/*"*"',function(req,res){

    fs.readFile('./Views/NotFound.html', function(err,data){
        if(err){
            console.log("File not read properly!");
            return false;
        }

        res.end(data);
    })
    // res.write("<h1>Page not found</h1>");
    // res.end();
})

app.listen(port,function(err){
    if(err){
        console.log(err);
        return false;
    }

    console.log(`server start at port :- `,port);
})