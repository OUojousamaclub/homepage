db = firebase.firestore();


ip_adress = ""
fetch("https://ipinfo.io/json").then((response) => {
    return response.json()
}).then((json) => {
    ip_adress = json.ip
    console.log(ip_adress)
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
            this.classList.add("selected")
            if (ip_adress == "") {
                window.alert("送信前にエラーが発生しました")
                return
            }
            dic = {}
            dic[ip_adress.replaceAll(".",",")] = this.innerText
            db.collection("vote").doc("answer").update(dic)
            fetch('https://marshmallow-5ardwkmm7q-uc.a.run.app?c=v1&o='+this.innerText)
        })
        div.classList.add("option", "btn2")
        document.getElementById('option_field').appendChild(div)
    }
}).catch((error) => {
    console.log("Error getting document:", error);
    window.alert("エラーが発生しました！")
});

