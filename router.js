const express = require("express");
const uniqid = require("uniqid");
const router = express.Router();
const crud = require("./crud");
//new message handeeler
router.post("/hello", async (req, res) => {
  //I want to create object in the name of id because I want to identify who is the sender
		await crud.addmessage(req.body.msg, req.body.id, req.body.sender);
  if (!global[req.body.id]) {
    global[req.body.id] = {};
    global[req.body.id].sender = [];
    global[req.body.id].receiver = [];
    if (req.body.sender == true) {
      global[req.body.id].sender.push(req.body.msg);
    } else {
      global[req.body.id].receiver.push(req.body.msg);
    }
  } else {
    //when there is already the object present
    if (req.body.sender == true) {
      global[req.body.id].sender.push(req.body.msg);
    } else {
      global[req.body.id].receiver.push(req.body.msg);
    }
  }
  res.send("ok got the message");
});
//receiving id
router.post("/idrec", async (req, res) => {
  //searching whether the id already exists in the database
  let cur = await crud.search(req.body.idv);
  if (cur) {
    res.send(true);
  } else {
    res.send(false);
  }
});
//this is invoked when the client first connects and we push id and its creation timing into the database
router.get("/id", (req, res) => {
  const id = uniqid();
	const date = new Date();
  res.send(id);
  let insobj = {
    date: `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`,
			day: `${date.getDay()} : ${date.getMonth()} : ${date.getFullYear()}`,
    msgid: id,
  };
  crud.insert(insobj).then((added) => {
    if (added.insertedCount == 1) {
      console.log("successfully added to the db");
    } else {
      console.log("some error in db insertion");
    }
  });
});
//polling : the client sends the post request every 1.5 seconds with its id and if that id has any pending
// messages we would repond it with messages
//now the polling happens with who the sender or receiver
router.post("/poll",async (req, res) => {
  //  console.log(`from poll router: ${JSON.stringify(req.body)}`);
		try {
				const crudres = await	crud.pollsend(req, res);
				res.send(crudres);
				await crud.deletestuff(req.body.who, req.body.idpoll)
		} catch (err) {
				console.log(err);
		}


//making changes using database stored values
/*  if (global[req.body.idpoll] != null) {
    if (req.body.who == true) {
      if (global[req.body.idpoll].receiver.length != 0) {
        console.log(global[req.body.idpoll].receiver);
        res.send(global[req.body.idpoll].receiver);
        //res.json({ array: global[req.body.idpoll].receiver });
        global[req.body.idpoll].receiver = [];
      } else {
        res.send(null);
        //            console.log('nothing to send');
      }
    } else if (req.body.who == false) {
      if (global[req.body.idpoll].sender.length != 0) {
        console.log(global[req.body.idpoll].sender);
        res.send(global[req.body.idpoll].sender);
        //res.json({ array: global[req.body.idpoll].sender });
        global[req.body.idpoll].sender = [];
      } else {
        res.send(null);
        //           console.log('nothing to send');
      }
    }
  } else {
    res.send(null);
  }
	*/
});
module.exports = router;
