document.getElementById('submit').addEventListener('click',()=>{
    console.log('click')
    let name=document.getElementById('name').innerText
    let contents=document.getElementById('contents').innerText
    let email=document.getElementById('email').value
    console.log(name,contents,email)
    fetch(`https://wwlza1v509.execute-api.ap-northeast-1.amazonaws.com/default/SendEmail?org=ojob&name=${name}&body=${contents}&email=${email}`)
    .then((res)=>res.json()).then((res)=>console.log(res))
    .catch((err)=>console.log(err))
})