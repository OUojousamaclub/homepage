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
            username: nameInput.value,
            content: msgTextarea.value
        })
    })
    .then(res => {
        console.log(res);
        msgTextarea.value = '';
        result.innerText = '無事に送信されましたわ！';
    });
})


randomBtn.addEventListener('click', function() {
    const randomNames=["才能あふれるお嬢様","寡黙な執事","冷静沈着な執事","おてんばメイド","謎めいた館主","陽気な庭師","書物好きな司書","忠実な従者",
    "勤勉な家政婦","物静かな画家","秘密を抱える使用人","孤高の音楽家","気まぐれな芸術家","怪しい占い師","冷酷な刺客",
    "優雅な舞踏教師","情熱的なオペラ歌手","才能溢れる若き芸術家","庭園に昔からある銅像","館の主の愛犬"];
    nameInput.value=randomNames[Math.floor(Math.random() * randomNames.length)];
});

nameInput.addEventListener('change', function() {
    //save to local storage
    localStorage.setItem('name', nameInput.value);
});

window.addEventListener('load', function() {
    nameInput.value=localStorage.getItem('name');
});
