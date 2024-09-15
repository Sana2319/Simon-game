let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ['red', 'yellow', 'green', 'purple'];

// Show Rules Modal
let modal = document.getElementById("rulesModal");
let showRulesBtn = document.getElementById("showRulesBtn");
let closeModal = document.querySelector(".close");

// Show the modal when the "Show Rules" button is clicked
showRulesBtn.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the "x" button is clicked
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Game logic
document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log(gameSeq);
  
    gameFlash(randBtn);
}

function checkAns(currentLevel) {
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `Game Over! Your score was ${level}. Press any key to start.`;
        document.querySelector("body").style.color = "red";
        setTimeout(reset, 1000);
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);
    
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.querySelector("body").style.color = "black";
}
