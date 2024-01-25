const keys=[]
db.collection('vote').doc('question').get().then((doc) => {
    document.getElementById("title").innerText = doc.data()["title"]
    for (key of doc.data()["options"]) {
        keys.push(key)
    }
    F(keys)
})

F=(keys)=>{
    db.collection("vote").doc("answer")
        .onSnapshot((doc) => {
            document.getElementById("result_div").innerHTML = ""
            dic={}
            for (key in doc.data()) {
                val=doc.data()[key]
                if (dic[val]==undefined){
                    dic[val]=1
                }else{
                    dic[val]+=1
                }
            }
            for(key of keys){
                div = document.createElement("div")
                div.innerText = key + ":" + (dic[key] || 0)
                document.getElementById('result_div').appendChild(div)
                
                bar=document.createElement("div")
                bar.classList.add("bar")
                bar.style.width=(dic[key] || 0)*5+"%"
                document.getElementById('result_div').appendChild(bar)
            }
        });
}