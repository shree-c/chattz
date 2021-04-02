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
module.exports = client