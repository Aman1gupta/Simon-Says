let gameSeq=[];
let userSeq=[];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");// it from h2 from html

document.addEventListener("keypress", function() {
    //"keypress" tell ki kuch press hua ki nahi
    if (started == false) {
        //if we don't write  this every press on keyboard it prints "game is started"
        console.log("game is started");
        started = true;

        levelUp();
        //calling fn
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}



function levelUp() {
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    //here we add sequence in "gameSeq"
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);

}

function checkAns(idx){
    // console.log("cuu level", level)

    // let idx = level-1;
    if (userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        // h2.innerText = `Gave over! Press any key to restart`; // bec. does not give tags in innerText that's we use innerHtml
        h2.innerHTML = `Gave over! Your score was <b>${level}</b><br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        });
        reset();
    }
}

function btnPress() {
    console.log(this); //yha this wahi btn hai jise hum press karte hai
    let btn = this;
    userFlash(btn);// Bec. user ke click karne par bhi flash karega 

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
    //"btnPress" is called
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
