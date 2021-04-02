const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();
const crud = require('./crud');
const db = require('./db');
const date = new Date();
//new message handeeler
router.post('/hello', (req, res)=>{
    console.log(`ids from messages: ${req.body.id}`)
    if (!global[req.body.id]) {
    global[req.body.id] = new Array();
        console.log(`${req.body.id}: ${global[req.body.id][0]} new array created`)
    }
    global[req.body.id].push(req.body.msg);
    //console.log(`${req.body.id}: ${global[req.body.id][0]} new array created`)
    res.send("ok got the message")
    //console.log(req.body.msg);
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
    console.log(`from poll: ${req.body.idpoll} : ${global[req.body.idpoll]}`)
    if (global[req.body.idpoll]) {
        if (global[req.body.idpoll].length > 0) {
            console.log(`${global[req.body.idpoll].length} messages pending`)
        }
        res.json({array : global[req.body.idpoll]})
        global[req.body.idpoll] = null;
        
    } else 
        res.send(null)

})
module.exports = router