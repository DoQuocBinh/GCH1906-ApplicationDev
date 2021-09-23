const express = require('express');
var router = express.Router();

//localhost/admin/
router.get('/',(req,res)=>{
    res.render('adminHome',{pageTitle:"Admin home"})
})

//localhost/admin/addUser
router.get('/addUser',(req,res)=>{
    res.render('addUser',{pageTitle:'Add User'})
})

module.exports = router;