const express = require('express');
const path = require('path');

const port = 8001;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

var data = [
    {
        'name':'Pawan',
        age:22,
    }
]

app.get('/updatePerson',(req,res)=>{
    console.log(req.query);
    let index = req.query.personPos;
    let singlePerson = data[index];
    console.log(singlePerson)

    return res.render('editHome',{
        singlePerson
    })
})

app.get('/deletePerson/:pId',(req,res)=>{
    console.log(req.params.pId)
    data.splice(req.params.pId,1);
    return res.redirect('/');
})

app.post('/addPerson', (req, res)=>{
    data.push(req.body);
    return res.redirect('/')
})

app.get('/', (req,res)=>{
    console.log('Request Find...');
    res.render("home",{
        data
    });
})

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }

    console.log("Server started at port :- ",port);
})