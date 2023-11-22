submit.addEventListener('click', function() {
    fetch('https://discord.com/api/webhooks/1176884868022538292/ySowWiTPAznwI0M8OnjFVEyScB19gNPqEV4hVjYqUVvFseyWF3ZiPCQXXpxa2LVMc83B', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "匿名投稿",
            content: msgTextarea.value
        })
    })
    .then(res => {
        console.log(res);
        msgTextarea.value = '';
        result.value = '送信完了！';
    });
})
