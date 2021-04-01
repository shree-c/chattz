//import circle from "./circle";
const { urlencoded } = require('body-parser');
const express = require('express');
const path = require('path');
let app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname + 'public')));
app.post('/hello', (req, res)=>{
    res.send('hello world');
    console.log(req.body.msg);
})

app.listen(2000, ()=>{
    console.log('listening at port 2000');
})

