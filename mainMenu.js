let $ = function (id) {
    return document.getElementById(id);
}
//let canvas1, ctx1, canvas2, ctx2;
onload = function(){
    $("loadScr").hidden = true;
}

let canvas, ctx;

let windowH = window.innerHeight;
let windowW = window.innerWidth;
let gameH = window.innerHeight;
let gameW = window.innerWidth;

const imgBackGura = new Image(); 
imgBackGura.src = "./andrGura1.6/bk1_1.png"
const imgBackKorone = new Image(); 
imgBackKorone.src = "./Dog0.1/backVec/0.png"

backVec = [imgBackKorone, imgBackKorone]
//let backDef = 0; //номер актуального фона
let who = false; //false = gura / true = koro

//1920 x 937
let imgScaleX = windowW / 1920
let imgScaleY = windowH / 937
let imgScale = Math.min(imgScaleX, imgScaleY)


//backVecKoro = [];
let backSpeed = 2;
let backCnt = 0; //
function darwBackground() {
    ctx.drawImage(backVec[0], backCnt, 0, gameW , gameH); //
    ctx.drawImage(backVec[1], backCnt + gameW, 0, gameW , gameH); //

    backCnt-=backSpeed;
    if (backCnt < (-gameW)){        
        backCnt = 0;
        backVec.splice(0, 1);
        backVec.push(imgBackKorone);
        // console.log(backVec);
    }
}
//Dog0.1
persons = []
for (let i = 0; i <= 6; ++i) {
    const imgBack = new Image();
    let str = "./images/" + i + ".png";
    console.log(str);
    imgBack.src = str;
    persons.push(imgBack);
}

function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = windowW;
    canvas.height = windowH;

    engine();
}

onmouseup = function(){
    if (who){
        console.log("korone");
        document.location.href = "./Dog0.1/index.html";
    }
    else{
        console.log("gura");
        document.location.href = "./andrGura1.6/index.html";
    }
}

onmousemove = function(e){
    //console.log("mouse location:", e.clientX, e.clientY)
    if (e.clientX > (windowW / 2)){ //true = Koro
        //console.log(true, "a > b", [e.clientX, windowH / 2]);
        who = true;
    }
    if (e.clientX < windowH / 2){ //true = Koro
        //console.log(false);
        who = false;
    }
}

let scaleX = windowW / 480;
let scaleY = windowH / 320;

function sclX(x){
    return x * scaleX; 
}
function sclY(x){
    return x * scaleY; 
}

const xBackMultip = 0.5; // > меньше?           
let xBackgr = 0;
function drawBackground(){
    ctx.beginPath();
    ctx.drawImage (imgBackGura, (xBackgr / xBackMultip), 0, sclX(570), sclY(320))
    //86
    xBackgr--;
    if (xBackgr < -(sclX(86) * xBackMultip)){
        xBackgr = 0;
    }

    // //testLine  
    // ctx.rect(sclX(85.5), 0, 1, sclY(320));
    // ctx.fillStyle = "red";
    // ctx.fill();

    ctx.closePath();                
}

function drawGura(){
    drawBackground();
    ctx.drawImage(backVec[0], windowW / 2, 0, gameW , gameH); //
    //gura 940 x 1222
    ctx.drawImage(persons[5], 0, 0, 800 * imgScale, 894 * imgScale);
    ctx.drawImage(persons[6], windowW - 420 * imgScale, windowH - 480 * imgScale, 480 * imgScale, 480 * imgScale); //koro
}

function drawKorone(){
    darwBackground();
    ctx.drawImage (imgBackGura, -(windowW / 2) - (sclX(86)), 0, windowW + (sclX(86)), sclY(320));
    //koro 683 x 1206 ()
    ctx.drawImage(persons[2], windowW * 1.16 / 2, 0, 683 * imgScale, 1206 * imgScale);
    ctx.drawImage(persons[0], 0, windowH - 940 / 2 * imgScale, 940 / 2 * imgScale, 1222 / 2 * imgScale); //gura

}

function engine() {
    ctx.clearRect(0, 0, windowW, windowH);
    if (!who){
        drawGura();
    }
    else {
    drawKorone();
    }

    ctx.rect(0, 0, 50, 50);

    requestAnimationFrame(engine);
}
