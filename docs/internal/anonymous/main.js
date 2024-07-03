
function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of queryParams.entries()) {
        params[key] = value;
    }
    return params;
}

const queryParams = getQueryParams();
console.log(queryParams);

icon_path=''
secret_btn.addEventListener('click',()=>{
    icon_path=prompt('画像のパスを入力')
})


db=firebase.firestore();
id2url={}
db.collection("webhook").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        id2url[doc.id]=doc.data().url

        option=document.createElement('option')
        option.value=doc.id
        option.innerText=doc.data().name
        serverSelect.appendChild(option)
    });
    if(queryParams.server){
        serverSelect.value=queryParams.server
    }
});

submit.addEventListener('click', function () {
    url = id2url[serverSelect.value]
    if(!url){
        alert('サーバーを選択してくださいませ！')
        return
    }

    result.innerText = '執事が郵便局まで馬車を走らせていますわ...';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: !icon_path ? (JSON.stringify({
            username: nameInput.value || '匿名',
            content: msgTextarea.value || '-'
        })) : (JSON.stringify({
            username: nameInput.value || '匿名',
            content: msgTextarea.value || '-',
            avatar_url: icon_path,
        }))
    })
        .then(res => {
            console.log(res);
            msgTextarea.value = '';
            result.innerText = '無事に送信されましたわ！';
        }).catch(err => {
            console.error(err);
            result.innerText = 'エラーが発生しましたわ...';
        });
})


randomBtn.addEventListener('click', function () {
    const randomAttrs = ["才能あふれる", "寡黙な", "冷静沈着な", "おてんば", "謎めいた", "陽気な", "物好きな", "忠実な",
        "勤勉な", "物静かな", "秘密を抱える", "孤高の", "気まぐれな", "怪しい", "冷酷な", "優雅な", "情熱的な", "才能溢れる", "テンションの高い"];
    const randomRoles = ["お嬢様", "執事", "執事", "メイド", "館主", "庭師", "司書", "従者", "家政婦", "画家", "使用人", "音楽家",
        "芸術家", "占い師", "刺客", "舞踏教師", "オペラ歌手", "芸術家", "主の犬"];

    nameInput.value = randomAttrs[Math.floor(Math.random() * randomAttrs.length)] + randomRoles[Math.floor(Math.random() * randomRoles.length)];
});

nameInput.addEventListener('change', function () {
    //save to local storage
    localStorage.setItem('name', nameInput.value);
});

window.addEventListener('load', function () {
    nameInput.value = localStorage.getItem('name');
});
