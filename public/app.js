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