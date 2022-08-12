//mongodb stuff
require('dotenv').config({
    path: './config.env'
});
// we are using the new mongodb syntax here
const { MongoClient } = require('mongodb');
const connectionString = global.process.env.DBCONSTR;
console.log(connectionString);
const client = new MongoClient(connectionString);

async function run() {
    try {
        //connecting and exporting the database client
        await client.connect();
        // only exporting client here
        module.exports = client;
        const app = require('./index');
        app.listen(global.process.env.PORT, () => {
            console.log(`listining at ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

run();