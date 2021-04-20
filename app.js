var express = require('express')
var app = express()

const session = require('express-session');

app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'some122$$%*$##!!#$%@#$%', 
    cookie: { maxAge: 60000 }}));


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

var hbs = require('hbs')
app.set('view engine','hbs')


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/new',async (req,res)=>{
    var nameInput = req.body.txtName;
    var passInput = req.body.txtPassword;
    var roleInput = req.body.role;
    var newUser = {name: nameInput, password:passInput,role:roleInput};

    let client= await MongoClient.connect(url);
    let dbo = client.db("LoginDemo");
    await dbo.collection("users").insertOne(newUser);
    res.redirect('/login')
})
app.post('/doLogin',async (req,res)=>{
    var nameInput = req.body.txtName;
    var passInput = req.body.txtPassword;
    let client= await MongoClient.connect(url);
    let dbo = client.db("LoginDemo");
    const cursor  = dbo.collection("users").
        find({$and: [{name:nameInput},{password:passInput}]});
    
    const count = await cursor.count();
    
    if (count== 0){
        res.render('login',{message: 'Invalid user!'})
    }else{
        let name ='';
        let role = ''
        await cursor.forEach(doc=>{      
            name = doc.name;
            role = doc.role;           
        })
        req.session.User = {
            name : name,
            role : role
        }
        res.redirect('/')
    }    
    // dbo.collection("users").
    //     find({$and: [{name:nameInput},{password:passInput}]}).
    //         forEach( function(myDoc) { console.log( "user: " + myDoc.name ); } );
})

app.get('/',(req,res)=>{
    var user = req.session.User;
    if(!user  || user.name == ''){
        res.render('notLogin',{message:'user chua dang nhap'})
    }else{
        res.render('index',{name: user.name,role:user.role})
    }
})


app.listen(5000);
console.log("Server is runing 5000")