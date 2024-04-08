function getRandomStr(n){
    const str = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomStr = "";
    for(let i = 0; i < n; i++){
        randomStr += str[Math.floor(Math.random() * str.length)];
    }
    return randomStr;
}

new_vote_link.addEventListener("click", () => {
    const vote_id = getRandomStr(5);
    location.href = `./edit?id=${vote_id}`;
});



db=firebase.firestore();
db.collection("vote-q").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        div=document.createElement("div");
        a=document.createElement("a");
        a.href="./vote/?id="+doc.id;
        a.innerText=doc.data()["title"] + (localStorage.getItem("answer-"+doc.id)?"（回答済み）":"");
        div.appendChild(a);
        document.getElementById('question_lst').appendChild(div);
    });
});