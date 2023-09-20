// ハンバーガーメニュー
// document.getElementById("hamburger").addEventListener("click",function(){
//     console.log(this)
//     this.classList.toggle("active");
// })



// 来場者カウンター
if(window.location.href.indexOf("localhost")==-1){
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
}


// トップページのスライドショー
let prefix=""
let no_of_imgs=0
if(window.innerHeight<window.innerWidth){
    prefix="h"
    no_of_imgs=5
}
else{
    prefix="v"
    no_of_imgs=3
}

let no=0;
(F=()=>{
    document.getElementById("top").style.backgroundImage="url('imgs/"+prefix+no+".jpg')"
    no+=1
    no%=no_of_imgs
    setTimeout(F,5000)
})()