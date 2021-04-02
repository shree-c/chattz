//import circle from "./circle";
const express = require('express');
const path = require('path');
let app = express();
let router = require('./router');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
//mongodb stuff
const { MongoClient } = require("mongodb");
const uri = 'mongodb://localhost:27017/';
const client =  new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
app.listen(2000, ()=>{
    console.log('listening at port 2000');
})