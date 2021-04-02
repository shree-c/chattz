const mdbclient = require('./db');
exports.insert = async (obj) => {
    const col = (await mdbclient).db('anny').collection('ids');
    return await col.insertOne(obj);

}