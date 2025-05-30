const express = require("express");
const path = require("path");

const port = 8001;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

let data = [
  {
    username: "Pawan",
    age: 25,
  },
];

app.post('/updatePerson/:pId',(req,res)=>{
 const pId = req.params.pId;
 data[pId] = req.body;
 return res.redirect('/');
})


app.get('/editPerson/:pId',(req,res)=>{
   const pId = req.params.pId;
    const person = data[pId];
    return res.render('editPage',{person,pId})
})

app.get('/deletePerson/:pId',(req,res)=>{
    data.splice(req.params.pId,1);
    return res.redirect('/');
})

app.post('/addPerson',(req,res)=>{
    data.push(req.body);
    return res.redirect('/');
})


app.get("/", (req, res) => {
  return res.render("home",{
    data
  });
});
app.get('/*"*"', (req, res) => {
  return res.render("error");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }

  console.log("server started at port :- ", port);
});
