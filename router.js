const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();
const crud = require('./crud');
const db = require('./db');
const date = new Date();
//new message handeeler
router.post('/hello', (req, res)=>{
    res.send('hello world');
    console.log(req.body.msg);
})
//receiving id 
router.post('/idrec', async (req, res)=>{
    let cur = await crud.search(req.body.idv);
    if ( cur ) {
        res.send(true)
    }else {
        res.send(false)
    };
    console.log(req.body.idv);
})
//id creator
router.get('/id', (req, res)=>{
    const id = uniqid();
    res.send(id);
    let insobj = {
        date : `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`,
        msgid : id
    }
    crud.insert(insobj).then((added)=>{
     if (added.insertedCount == 1) {
        console.log('successfully added to the db');
    } else {
        console.log('some error in db insertion');
    }
    })
    
})
//polling
router.post('/poll', (req, res)=>{
//    console.log('called me');
    res.send('ok got it')
})
module.exports = router