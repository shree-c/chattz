const client = require('./db');
exports.insert = async (obj) => {
    const col = await client.db('anny').collection('ids');
    return await col.insertOne(obj);
}

exports.search = async (str) =>{
    const col = client.db('anny').collection('ids');
    const cursor = await col.findOne({msgid: str});
    console.log(cursor);
    return cursor;
}