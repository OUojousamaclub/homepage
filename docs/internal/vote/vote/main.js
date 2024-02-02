db = firebase.firestore();


ip_adress = ""

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

db.collection("vote").doc("question").get().then((doc) => {
    document.getElementById("title").innerText = doc.data()["title"]
    for (key of doc.data()["options"]) {
        div = document.createElement("div")
        div.innerText = key
        div.addEventListener("click", function () {
            Array.from(document.getElementsByClassName("option")).forEach((element, index) => {
                element.classList.remove("selected")
            })
            const element = this;
            element.classList.add("selected")
            if (ip_adress == "") {
                window.alert("送信前にエラーが発生しました")
                return
            }
            dic = {}
            fetch('https://marshmallow-5ardwkmm7q-uc.a.run.app?c=v1&o='+this.innerText)
            dic[ip_adress] = this.innerText
            db.collection("vote").doc("answer").update(dic).then(() => {
                view_result.style.display = "block"
            }).catch((error) => {
                console.log("Error updating document:", error);
                window.alert("エラーが発生しました！")
            })
        })
        div.classList.add("option", "btn2")
        document.getElementById('option_field').appendChild(div)
    }
}).catch((error) => {
    console.log("Error getting document:", error);
    window.alert("エラーが発生しました！")
});

