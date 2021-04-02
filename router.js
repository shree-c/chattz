const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();
const crud = require('./crud');
const date = new Date();
router.post('/hello', (req, res)=>{
    res.send('hello world');
    console.log(req.body.msg);
})
router.post('/idrec', (req, res)=>{
    res.send('received id');
    console.log(req.body.idv);
})
router.get('/id', (req, res)=>{
    const id = uniqid();
    res.send(id);
    let insobj = {
        date : `${date.getHours} : ${date.getMinutes} : ${date.getSeconds}`,
        msgid : id
    }
    crud.insert(insobj).then((added)=>{
     if (added.insertedCount == 1) {
        console.log('successfully added to the db');
    } else {
        console.log('some error in db insertion');
    }
    })
    // const added = await crud.insert(insobj);
    // if (added == 1) {
    //     console.log('successfully added to the db');
    // } else {
    //     console.log('some error in db insertion');
    // }
    
})
router.post('/poll', (req, res)=>{
//    console.log('called me');
    res.send('ok got it')
})
module.exports = router