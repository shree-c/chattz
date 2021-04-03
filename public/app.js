//messgae handling function
let origin = null;
async function clickhan() {
  let msgele = document.querySelector(".messagebox");
  console.log(msgele.value);
  addhtml(msgele.value);
  let obj = {
    msg: msgele.value,
    id: idspele.innerHTML,
    sender: origin
  };
  let promise = await fetch("/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  let text = await promise.text();
  console.log(text);
  //promise.then(()=>{console.log(promise.status)});
  msgele.value = "";
}

function addhtml(str) {
  let msgele = document.querySelector(".msgs");
  let dt = new Date();
  msgele.insertAdjacentHTML(
    "beforeend",
    `<p class="msgtex">--->[${dt.getHours()} : ${dt.getMinutes()} : ${dt.getSeconds()}] | ${str}</p>`
  );
}

//getting id
let idspele = document.querySelector(".idtex");
async function idgen() {
  let getid = await fetch("/id");
  let uid = await getid.text();
  idspele.innerHTML = uid;
  origin = true;
}
idgen();

//id element
async function sendid() {
  let idval = document.querySelector(".idtexs").value;
  let obj = {
    idv: idval,
  };
  let sendiid = await fetch("/idrec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  const res = await sendiid.text();
  if (res) {
    idspele.innerHTML = idval;
  }
  origin = false;
  console.log(res);
}
//pings server with its id and origin value
setInterval(async () => {
  let obj = {
    idpoll: idspele.innerHTML,
    who: origin,
  };
  let posreq = await fetch("/poll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  const data = await posreq.json();
  if (!data) {
    console.log("null");
  } else {
    data.array.forEach((element) => {
      rechtml(element);
    });
  }
}, 1800);

//after searching for id, if the search is successfun we will set the main id to the searched one
function rechtml(arrmes) {
  let msgele = document.querySelector(".msgs");
  let dt = new Date();
  msgele.insertAdjacentHTML(
    "beforeend",
    `<p class="msgtex"><---[${dt.getHours()} : ${dt.getMinutes()} : ${dt.getSeconds()}] | ${arrmes}</p>`
  );
}
