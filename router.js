const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();
const crud = require('./crud');
const db = require('./db');
const date = new Date();
//new message handeeler
router.post('/hello', (req, res)=>{
    console.log(req.body)
    //I want to create object in the name of id because I want to identify who is the sender
    if (!global[req.body.id]) {
        global[req.body.id] = {};
        global[req.body.id].sender = [];
        global[req.body.id].receiver = [];
    } else {
        if (req.body.sender == true) {
            global[req.body.id].sender.push(req.body.msg);
        } else {
            global[req.body.id].receiver.push(req.body.msg);
        }
    }
    //I am adding the messages to an array having the id of client as name
    // if (!global[req.body.id]) {
    // global[req.body.id] = new array();
    //     console.log(`${req.body.id}: ${global[req.body.id][0]} new array created`)
    // }
    // global[req.body.id].push(req.body.msg);
    // res.send("ok got the message")
})
//receiving id 
router.post('/idrec', async (req, res)=>{
    //searching whether the id already exists in the database
    let cur = await crud.search(req.body.idv);
    if ( cur ) {
        res.send(true)
    }else {
        res.send(false)
    };
    //console.log(req.body.idv);
})
//this is invoked when the client first connects and we push id and its creation timing into the database
router.get('/id', (req, res)=>{
    const id = uniqid();
    res.send(id);
    let insobj = {
        date : `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`,
        msgid : id
    }
    crud.insert(insobj).then((added)=>{
    if (added.insertedCount == 1) {
    //    console.log('successfully added to the db');
    } else {
    //    console.log('some error in db insertion');
    }
    })
})
//polling : the client sends the post request every 1.5 seconds with its id and if that id has any pending 
// messages we would repond it with messages 
//now the polling happens with who the sender or receiver
router.post('/poll', (req, res)=>{
    res.status(200);
    if (req.body.who == true) {
        if (global[req.body.idpoll]) {
            if (global[req.body.idpoll].receiver) {
                console.log(global[req.body.idpoll].receiver)
                res.json({array : global[req.body.idpoll].receiver})
                global[req.body.idpoll].receiver  = null;
            }
        }
    } else  (req.body.who == false)
    {
        if (global[req.body.idpoll]) {
            if (global[req.body.idpoll].sender) {
                res.json({array : global[req.body.idpoll].sender})
                global[req.body.idpoll].sender  = null;
            }
        }
    }
//    console.log('called me');
//    console.log(`from poll: ${req.body.idpoll} : ${global[req.body.idpoll]}`)
    // if (global[req.body.idpoll]) {
    //     if (global[req.body.idpoll].length > 0) {
    //         console.log(`${global[req.body.idpoll].length} messages pending`)
    //     }
    //     res.json({array : global[req.body.idpoll]})
    //     global[req.body.idpoll] = null;
        
    // } else 
        // res.send(null)

})
module.exports = router