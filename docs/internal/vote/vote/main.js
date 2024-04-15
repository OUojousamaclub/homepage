queryParams={}
location.search.substr(1).split("&").forEach((element)=>{
    let pair=element.split("=")
    queryParams[pair[0]]=pair[1]
})
const id=queryParams["id"]
if(!id){
    location.href="../"
}
document.getElementById('to_result_link').href = `../result/?id=${id}`


db = firebase.firestore();

ip_adress = ""

prev_answer = localStorage.getItem("answer-"+id)

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // (utf-8 の) Uint8Array にエンコードする
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // メッセージをハッシュする
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // バッファーをバイト列に変換する
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // バイト列を 16 進文字列に変換する
    return hashHex;
}


fetch("https://ipinfo.io/json").then((response) => {
    return response.json()
}).then((json) => {
    digestMessage(json.ip).then((digestHex) => {
        ip_adress = digestHex.slice(0,20)
        console.log(digestHex)
    });
}).catch((error) => {
    console.log("Error getting ip:", error);
});

db.collection("vote-q").doc(id).get().then((doc) => {
    document.getElementById("title").innerText = doc.data()["title"]
    for (key of doc.data()["options"]) {
        div = document.createElement("div")
        div.innerText = key
        div.addEventListener("click", function () {
            Array.from(document.getElementsByClassName("option")).forEach((element, index) => {
                element.classList.remove("selected")
            })
            const element = this;
            const answer= this.innerText
            element.classList.add("selected")
            if (ip_adress == "") {
                // window.alert("送信前にエラーが発生しました")
                // return
                ip_adress ='anonymous'
            }
            dic = {}
            dic[ip_adress] = answer
            db.collection("vote-a").doc(id).update(dic).then(() => {
                view_result.style.display = "block"
                localStorage.setItem("answer-"+id, answer)

            }).catch((error) => {
                console.log("Error updating document:", error);
                window.alert("エラーが発生しました！")
            })

        })

        db.collection('log').add({
            'kind':'vote',
            'time': firebase.firestore.FieldValue.serverTimestamp(),
            'ip': ip_adress,
            'id': id,
            'option': key
        }).then(() => {
            console.log("log added")
        }).catch((error) => {
            console.log("Error adding log:", error);
        });

        
        if (prev_answer == key) {
            div.classList.add("selected")
            view_result.style.display = "block"
        }
        div.classList.add("option", "btn2")
        document.getElementById('option_field').appendChild(div)
    }
}).catch((error) => {
    console.log("Error getting document:", error);
    window.alert("エラーが発生しました！")
});


db.collection('vote-c').doc(id).onSnapshot((doc) => {
    document.getElementById('comment_field').innerHTML = ""
    Array.from(doc.data()["comments"]).forEach((element) => {
        div = document.createElement("div")
        div.innerText = element
        document.getElementById('comment_field').appendChild(div)
    })
})
comment_btn.addEventListener("click", function () {
    db.collection('vote-c').doc(id).update({
        comments:firebase.firestore.FieldValue.arrayUnion(comment_input.value)
    }).then(() => {
        comment_input.value = ""
    }).catch((error) => {
        console.log("Error updating document:", error);
        window.alert("エラーが発生しました！")
    })
})