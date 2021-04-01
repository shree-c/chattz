//import circle from "./circle";
const express = require('express');
const path = require('path');
const uniqid = require('uniqid')
let app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
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

//mongodb stuff
app.post('/hello', (req, res)=>{
    res.send('hello world');
    console.log(req.body.msg);
})
app.post('/idrec', (req, res)=>{
    res.send('received id');
    console.log(req.body.idv);
})
app.get('/id', (req, res)=>{
    res.send(uniqid());
})
app.post('/poll', (req, res)=>{
    console.log('called me');
    res.send('ok got it')
})
app.listen(2000, ()=>{
    console.log('listening at port 2000');
})

