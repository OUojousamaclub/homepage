queryParams={}
location.search.substr(1).split("&").forEach((element)=>{
    let pair=element.split("=")
    queryParams[pair[0]]=pair[1]
})
const id=queryParams["id"]
if(!id){
    location.href="../"
}

document.getElementById('to_vote_link').href = `../vote/?id=${id}`

function addOption() {
    var optionsContainer = document.getElementById('optionsContainer');
    var optionDiv = document.createElement('div');
    var newOption = document.createElement('input');
    newOption.setAttribute('type', 'text');
    newOption.setAttribute('placeholder', '新しい選択肢');
    newOption.classList.add('option');
    var deleteButton = document.createElement('div');
    deleteButton.innerText = '削除';
    deleteButton.classList.add('del_btn');
    deleteButton.setAttribute('onclick', 'removeOption(this)');

    optionDiv.appendChild(newOption);
    optionDiv.appendChild(deleteButton);
    optionsContainer.appendChild(optionDiv);
}

function removeOption(btn) {
    var optionDiv = btn.parentNode;
    optionDiv.parentNode.removeChild(optionDiv);
}


update_btn.addEventListener('click',function(){
    this.innerText="更新中..."
    let dic={}
    title=document.getElementById("question_title").value;
    dic["title"]=title
    dic["options"]=[]
    dic["timestamp"]=firebase.firestore.FieldValue.serverTimestamp()
    Array.from(document.getElementsByClassName("option")).forEach((element, index) => {
        if(element.value!=""){
            dic["options"].push(element.value)
        }
    })
    
    db=firebase.firestore();
    db.collection("vote-q").doc(id).set(dic).then(()=>{
        this.innerText="更新する"
        document.getElementById("msg").innerText="成功"
    }).catch((error)=>{
        this.innerText="更新する"
        window.alert("エラーが発生しました！")
    })
    db.collection("vote-a").doc(id).set({})
})