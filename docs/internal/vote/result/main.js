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
        for(key in dic){
            div = document.createElement("div")
            div.innerText = key + ":" + dic[key]
            document.getElementById('result_div').appendChild(div)
        }
    });