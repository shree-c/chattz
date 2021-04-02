const express = require('express');
const uniqid = require('uniqid')
const router = express.Router();

router.post('/hello', (req, res)=>{
    res.send('hello world');
    console.log(req.body.msg);
})
router.post('/idrec', (req, res)=>{
    res.send('received id');
    console.log(req.body.idv);
})
router.get('/id', (req, res)=>{
    res.send(uniqid());
})
router.post('/poll', (req, res)=>{
//    console.log('called me');
    res.send('ok got it')
})
module.exports = router