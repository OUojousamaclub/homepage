// ハンバーガーメニュー
document.getElementById("hamburger").addEventListener("click",function(){
    console.log(this)
    this.classList.toggle("active");
})


// 来場者カウンター
db.collection("global").doc("visit-count").get().then((doc) => {
    if (doc.exists) {
        let count = doc.data().count;
        document.getElementById("visitCounter").innerHTML = `あなたは${count}人目の訪問者ですわ！`;
        db.collection("global").doc("visit-count").set({
            count: count + 1
        });
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

