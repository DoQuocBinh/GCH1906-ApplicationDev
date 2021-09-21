const express = require('express');
var router = express.Router();

//localhost/admin/
router.get('/',(req,res)=>{
    res.render('adminHome')
})

//localhost/admin/addUser
router.get('/addUser',(req,res)=>{
    res.render('addUser')
})

module.exports = router;