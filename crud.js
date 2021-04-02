const mdbclient = require('./db');
exports.insert = async (obj) => {
    mdbclient.connect();
    const db = mdbclient.db('anny');
    const col = db.collection('ids');
    const res = await col.insertOne(obj);
    mdbclient.close();
    return res;
}