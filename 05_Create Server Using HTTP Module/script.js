// Method 1 :


// const http = require('http');

// const port = 8080;

// const requestHandler = (req,res)=>{
// res.write("Name : Pawan Maurya ");
// res.write("Age : 25");
// res.end();
// }

// const server = http.createServer(requestHandler);

// server.listen(port,function(err){
//     if(err){
//         console.log(err);
//         return false;
//     }

//     console.log("Server started at port :- ",port);
// })


// Method 2:

const http = require('http');
const fs = require('fs');

const port = 8080;

const requestHandler = (req,res)=>{
    // console.log(req.url);
    let fileName = '';

    switch(req.url){
        case '/':
            fileName = 'Home.html';
            break;
        case '/about':
            fileName='About.html';
            break;
        default :
            fileName = 'Error.html';
            break;
    }

    fs.readFile(fileName,(err,result)=>{
        if(!err){
            res.end(result);
        }
    })

}

const server = http.createServer(requestHandler);

server.listen(port,(err,result)=>{
    if(err){
       console.log(err);
       return false;
    }

    console.log("Server Started at port :- ",port);
})