const express =require('express')
const app = express()
const hbs = require('hbs')

app.set('view engine','hbs')
hbs.registerPartials(__dirname +'/views/partials')

app.get('/',(req,res)=>{
    res.render('index',{pageTitle:'Index Page'})
})

var adminController = require('./admin.js');
app.use('/admin',adminController);


const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is running")