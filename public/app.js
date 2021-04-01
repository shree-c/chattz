async function clickhan() {
    let msgele = document.querySelector('.messagebox');
    console.log(msgele.value);
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