async function clickhan() {
    let msgele = document.querySelector('.messagebox');
    console.log(msgele.value);
    addhtml(msgele.value);
    let obj = {
        msg : msgele.value,
        id : idspele.innerHTML,
    }
    let promise = await fetch('/hello', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(obj),
    });
    let text = await promise.text();
    console.log(text);
    //promise.then(()=>{console.log(promise.status)});
    msgele.value = '';
}
function addhtml(str) {
    let msgele = document.querySelector('.msgs');
    let dt = new Date();
    msgele.insertAdjacentHTML('beforeend', `<p class="msgtex">--->[${dt.getHours()} : ${dt.getMinutes()} : ${dt.getSeconds()}] | ${str}</p>`)
}


//getting id
let idspele = document.querySelector('.idtex');
async function idgen() {
    let getid = await fetch('/id');
    let uid = await getid.text();
    idspele.innerHTML = uid;
}
idgen();

//id element
async function sendid() {
    let idval = document.querySelector('.idtexs').value;
    let obj = {
        idv : idval
    }
    let sendiid = await fetch('/idrec', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body : JSON.stringify(obj),
    });
    const res = await sendiid.text();
    if (res) {
        idspele.innerHTML = idval;
    }
    console.log(await sendiid.text())
}


setInterval(async ()=>{
    let obj = {
        idpoll : idspele.innerHTML,
    }
    let posreq = await fetch('/poll', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body : JSON.stringify(obj),
    });
    const data = await posreq.json();
    if (!data) {
        console.log('null')
    } else {
        data.array.forEach(element => {
            rechtml(element)
        });
//        console.log(finarr.array);
//        let obj = JSON.parse(data);
 //       console.log(obj.array);
//        console.log(finarr[0]);
    }


}, 1800);


//after searching for id, if the search is successfun we will set the main id to the searched one
function rechtml(arrmes) {
    let msgele = document.querySelector('.msgs');
    let dt = new Date();
    msgele.insertAdjacentHTML('beforeend', `<p class="msgtex"><---[${dt.getHours()} : ${dt.getMinutes()} : ${dt.getSeconds()}] | ${arrmes}</p>`)
    
}