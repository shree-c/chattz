async function clickhan() {
    let msgele = document.querySelector('.messagebox');
    console.log(msgele.value);
    addhtml(msgele.value);
    let obj = {
        msg : msgele.value
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
}


setInterval(async ()=>{
    let posreq = await fetch('/poll', {
        method: 'POST'
    });
    console.log(await posreq.text());

}, 1800);