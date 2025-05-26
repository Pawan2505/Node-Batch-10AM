const http = require('http');

const port = 8080;

const requestHandler = (req,res)=>{
    res.write("<h1>Hello Red and white Family!</h1>")
    res.write("Email : pawan@gmail.com");
    res.write("City : Amreli");
    res.write
    res.end()
}

const server = http.createServer(requestHandler);

server.listen(port,(err)=>{
    if(err){
        console.log("Sever is not start on port");
        return false;
    }
    console.log("Server is start on port :- ", port)
})