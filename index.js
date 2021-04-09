const express = require('express');
const path = require('path');
let app = express();
let router = require('./router');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
const mdbclient = require('./db');
app.listen(2000, ()=>{
    console.log('listening at port 2000');
})
