//import circle from "./circle";
const express = require('express');
const path = require('path');
let app = express();
let router = require('./router');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
const mdbclient = require('./db');

//pinging db from here
async function run() {
  try {
    // Connect the client to the server
    await mdbclient.connect();
    // Establish and verify connection
    await mdbclient.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server from index.js");
  } finally {
    // Ensures that the client will close when you finish/error
    await mdbclient.close();
  }
}
run().catch(console.dir);


app.listen(2000, ()=>{
    console.log('listening at port 2000');
})