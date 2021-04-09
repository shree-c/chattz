const client = require('./db');
const col = client.db('anny').collection('ids');
exports.insert = async (obj) => {
    return await col.insertOne(obj);
}

exports.search = async (str) =>{
    const cursor = await col.findOne({msgid: str});
    return cursor;
}

exports.addmessage = async (message, id, who) => {
		const query = {
				msgid: id,
		};
		const varwho = (who == true) ? "sender" : "receiver";
		const updatedoc = {
				$push : {
						[varwho] : message,
				}
		}
		await col.updateOne(query, updatedoc)
		.then(null).catch(error=> console.log(error))
		/*if (res.message) {
				console.log(`error from addmessage: ${JSON.stringify(res.message)}`);
		} else {
				console.log(`successful message insertion`);
		}*/
}
exports.pollsend = async (req, res) => {
		const query = {
				msgid : req.body.idpoll,
		}
		try {
				const result = await col.findOne(query);
				return new Promise((resolve, reject) =>{
						resolve(result)
						reject("some error in pollsend");
				})
		} catch(err) {
				console.log(err);
		}
}
exports.deletestuff = async (who, id) => {
		const varwho = (who == true) ? "receiver" : "sender";
		const query = {
				msgid : id,
		};
		const updatedoc = {
				$unset : {
						[varwho] : "",
				},
		};
		try {
				await col.updateOne(query, updatedoc);
		} catch(err) {
				console.log(`error from deletestuff : ${err}`);
		}
}
