submit.addEventListener('click', function() {
    url=""
    if (serverSelect.value=="作業部屋"){
        url='https://discord.com/api/webhooks/1176884868022538292/ySowWiTPAznwI0M8OnjFVEyScB19gNPqEV4hVjYqUVvFseyWF3ZiPCQXXpxa2LVMc83B'
    }else if(serverSelect.value=="テスト鯖"){
        url="https://discord.com/api/webhooks/1176879950586974308/8mH-13iYOjgY0PpaHEIi2sfKp21fm9FSRrukyl-O-m2EwvDKhb6DcsW_QGL1S5Cb7Nc1"
    }
    else if(serverSelect.value=="運営"){
        url="https://discord.com/api/webhooks/1176899917495664742/zjbiVmNUeGTQp7QqVATTyRBR-XqQfxNeY3gpcYDFGywhpp4OADiO2VmXLykt4eYQX6mE"
    }else{
        window.alert("バグですわ！急いで門番を呼んできなさい！")
        return
    }

    result.innerText = '執事が郵便局まで車を走らせていますわ...';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: nameInput.value || '匿名',
            content: msgTextarea.value || '-'
        })
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


randomBtn.addEventListener('click', function() {
    const randomAttrs=["才能あふれる","寡黙な","冷静沈着な","おてんば","謎めいた","陽気な","物好きな","忠実な",
    "勤勉な","物静かな","秘密を抱える","孤高の","気まぐれな","怪しい","冷酷な","優雅な","情熱的な","才能溢れる","テンションの高い"];
    const randomRoles=["お嬢様","執事","執事","メイド","館主","庭師","司書","従者","家政婦","画家","使用人","音楽家",
    "芸術家","占い師","刺客","舞踏教師","オペラ歌手","芸術家","主の犬"];

    nameInput.value=randomAttrs[Math.floor(Math.random() * randomAttrs.length)]+randomRoles[Math.floor(Math.random() * randomRoles.length)];
});

nameInput.addEventListener('change', function() {
    //save to local storage
    localStorage.setItem('name', nameInput.value);
});

window.addEventListener('load', function() {
    nameInput.value=localStorage.getItem('name');
});
