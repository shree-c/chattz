const client = require('./db');
const col = client.db('anny').collection('ids');
exports.insert = async (obj) => {
    return await col.insertOne(obj);
}

exports.search = async (str) =>{
    const cursor = await col.findOne({msgid: str});
    console.log(cursor);
    return cursor;
}

exports.addmessage = async (message, id, who) => {
		const query = {
				msgid: id,
		};
		const varwho = (who == true) ? "sender" : "reveiver";
		const updatedoc = {
				$push : {
						[varwho] : message,
				}
		}
		await col.updateOne(query, updatedoc)
		.then(success => console.log(success)).catch(error=> console.log(error))
		/*if (res.message) {
				console.log(`error from addmessage: ${JSON.stringify(res.message)}`);
		} else {
				console.log(`successful message insertion`);
		}*/
}
		

		

