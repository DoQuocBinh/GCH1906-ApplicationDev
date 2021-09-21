const express =require('express')
const app = express()

app.set('view engine','hbs')

app.get('/',(req,res)=>{
    res.render('index')
})

var adminController = require('./admin.js');
app.use('/admin',adminController);


const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is running")