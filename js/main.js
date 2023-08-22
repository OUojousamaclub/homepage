document.getElementById("hamburger").addEventListener("click",function(){
    console.log(this)
    this.classList.toggle("active");
})