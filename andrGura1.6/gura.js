let $ = function(id){
    return document.getElementById(id);
}
onload = function(){
    $("loadScr").hidden = true;
}

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let windowH = window.innerHeight;
let windowW = window.innerWidth;

let scaleX = windowW / 480;
let scaleY = windowH / 320;

let scaleShrimp = Math.min(scaleX, scaleY);
console.log([scaleX, scaleY, scaleShrimp]);

console.log(windowH);
console.log(windowW);
// изначально
// canvas.width = 480;
// canvas.height = 320;

canvas.width = windowW;
canvas.height = windowH;

//сколько шримпов
let howMuchShrimps = 1;
let counterShrimp = 0;

function sclX(x){
    return x * scaleX; 
}
function sclY(x){
    return x * scaleY; 
}
function sclShrimp(x){
    return x * scaleShrimp; 
}
function drawSclImg(r, x, y, w, h){
    ctx.drawImage(r, sclShrimp(x), sclShrimp(y), sclShrimp(w), sclShrimp(h));
}
function drawSclImgEnd(r, x, y, w, h){
    ctx.drawImage(r, sclX(x), sclY(y), sclX(w), sclY(h));
}


function countShrimps(){
    if (counterShrimp === howMuchShrimps - 1){
        counterShrimp = 0;
        howMuchShrimps++;

        shrimpX.push(getShrimpX());
        shrimpY.push(getShrimpY());
        Math.random() > 0.5 ? shrimpRevX.push(true) : shrimpRevX.push(false)
        Math.random() > 0.5 ? shrimpRevY.push(true) : shrimpRevY.push(false)
    }
    else{
        counterShrimp++
    }
}

//massives
//................
// const shrimpX = new Array();
const shrimpX = [];
let shrimpY = [];
let shrimpRevX = [];
let shrimpRevY = [];

//задаем начальные значения
for (let i = 0; i < howMuchShrimps; i++){
    shrimpX.push(getShrimpX());
    shrimpY.push(getShrimpY());
    console.log([shrimpX[i], shrimpY[i]]);

    Math.random() > 0.5 ? shrimpRevX.push(true) : shrimpRevX.push(false)
    Math.random() > 0.5 ? shrimpRevY.push(true) : shrimpRevY.push(false)
}

function getShrimpX(){
    // return scaleX * ((Math.random() * 440) + 10 * scaleShrimp) - (15 * scaleShrimp);
    return sclX((Math.random() * 460) + 10) - sclShrimp(15);
}
function getShrimpY(){
    // return (Math.random() * 300) + 10 - 15; 
    // return scaleY * ((Math.random() * 290) + sclShrimp(10)) - (15 * scaleShrimp);
    return sclY((Math.random() * 300) + 10) - sclShrimp(15);  
}
//............

//background
const imgBack = new Image(); 
imgBack.src = 'bk1_1.png';

//скорость водички (3)
const xBackMultip = 3; // > меньше?           
let xBackgr = 0;
function drawBackground(){
    ctx.beginPath();
    ctx.drawImage (imgBack, (xBackgr / xBackMultip), 0, sclX(570), sclY(320))
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

//многоШримповость
function newBallMulti(i){
    shrimpX[i] = sclX((Math.random() * 460) + 10) - sclShrimp(15); //-15 == correctShrimp
    shrimpY[i] = sclY((Math.random() * 300) + 10) - sclShrimp(15);      
    Math.random() > 0.5 ? shrimpRevX[i] = true : shrimpRevX[i] = false;
    Math.random() > 0.5 ? shrimpRevY[i] = true : shrimpRevY[i] = false;
}

//speed of Shrimp
let dx = sclShrimp(1);
let dy = sclShrimp(1);

let xRev = true;
let yRev = true;

const shrimpSize = sclShrimp(30);


const imgShrimp = new Image();
imgShrimp.src = 'shrimp.png';

function darwBallMulti(i){ //darwShrimp Multi
    ctx.beginPath();
    ctx.drawImage (imgShrimp, shrimpX[i], shrimpY[i], shrimpSize, shrimpSize);
    // ctx.arc(x, y, 20, 0, Math.PI*2);
    // ctx.fillStyle = "#0095DD"
    // ctx.fill();
    ctx.closePath();
}

//not used almost
let isMouthOpen = false;
let score = 0;
let health = 10000;
document.getElementById("health").innerHTML = health;


// document.addEventListener("keydown", ammMulti); //производит amm
document.addEventListener("keydown", eventSwitch); //производит amm

//для кнопок зажатие
//--------------
let buttonLeft = document.querySelector("#left");
let buttonRight = document.querySelector("#right");
let buttonAm = document.querySelector("#am");

// class Control{
//     handleEvent(event){
//         switch(event.type){
//             case 'touchstart':
//                 triggerLeft = true;
//                 break;
//             case 'touchend':
//                 triggerLeft = false;
//                 break;
//         }
//     }
// }

// let control = new Control;

// buttonLeft.addEventListener('touchstart', control);
// buttonLeft.addEventListener('touchend', control);

// buttonRight.addEventListener('touchstart', controlRight);
// buttonRight.addEventListener('touchend', controlRight);

// buttonAm.addEventListener('touchstart', ammMulti);
// buttonAm.addEventListener('touchend', ammMulti);


// function controlRight(event){
//     switch(event.type){
//         case 'touchstart':
//                 triggerRight = true;
//                 break;
//             case 'touchend':
//                 triggerRight = false;
//                 break;
//     }
// }

//mouse

// class Control{
//     handleEvent(event){
//         switch(event.type){
//             case 'mousedown':
//                 triggerLeft = true;
//                 break;
//             case 'mouseup':
//                 triggerLeft = false;
//                 break;
//         }
//     }
// }

// let control = new Control;

// buttonLeft.addEventListener('mousedown', control);
// buttonLeft.addEventListener('mouseup', control);

// buttonRight.addEventListener('mousedown', controlRight);
// buttonRight.addEventListener('mouseup', controlRight);

// buttonAm.addEventListener('mousedown', ammMulti);
// buttonAm.addEventListener('mouseup', ammMulti);


// function controlRight(event){
//     switch(event.type){
//         case 'mousedown':
//                 triggerRight = true;
//                 break;
//             case 'mouseup':
//                 triggerRight = false;
//                 break;
//     }
// }

// function controlAm(event){
//     switch(event.type){
//         case 'touchstart':
//             ammMulti();
//             break;
//         case 'touchend':
//             ammMulti();
//             break;
//     }
// }
//--------------------------
//если тру, то движется 
let triggerLeft = false;
let triggerRight = false;

let guraSpeed = 2;
//кнопки на экране
function moveLeft(){
    if(triggerLeft || triggerRight){
        triggerRight = false;
        triggerLeft = false;
    }
    else{
        triggerLeft = true;
    }
}

function moveRight(){
    if(triggerLeft || triggerRight){
        triggerRight = false;
        triggerLeft = false;
    }
    else{
        triggerRight = true;
    }
}

// function amKey(){
//     ammMulti();
// }
//-----------------

//для клавиатуры
// function eventSwitch(event){
//     switch(event.key){
//         case "A":
//             guraOffsetX-=guraSpeed;
//             break;
//         case "a":
//             guraOffsetX-=guraSpeed;
//             break;
//         case "ф": //русские ВПЕРЕД
//             guraOffsetX-=guraSpeed;
//             break;
//         case "Ф":
//             guraOffsetX-=guraSpeed;
//             break;
//         case "D":
//             guraOffsetX+=guraSpeed;
//             break;
//         case "d":
//             guraOffsetX+=guraSpeed;
//             break;
//         case "в":
//             guraOffsetX+=guraSpeed;
//             break;
//         case "В":
//             guraOffsetX+=guraSpeed;
//             break;
//         case " ":
//             //jump
//             break;
//         default:
//             ammMulti();
//             break;
//     }
// }

function eventSwitch(event){
    //console.log("event: ", event, event.keyCode);
    switch(event.keyCode){
    case 65:{ //left
        moveLeft();
        break;
    }
    case 68:{
        moveRight()
        break;
    }
    default:{
        ammMulti();
        break;
    }
    }
}

function correctShrimp(x){ //поправка на модель шримпа
    return (x - shrimpSize/2);
}

//смещение груры + рот
// let guraOffsetX = Math.random() * 460 - 380;
//-280;0
let guraOffsetX = Math.random() * (-280);
let guraOffsetY = 0;

// const guraA = new Audio("gawr-gura-a.mp3");
const guraA = new Audio("guraA.mp3");
const sadDoggo = new Audio("sadDoggo.mp3");

// let mute = flase;
// volume = mute ? 0 : 1;

// guraA.volume = volume;
// sadDoggo.volume = volume;

guraA.volume = 0.6;
sadDoggo.volume = 0.2;

//сделать циклом для каждого шримпа
function ammMulti(){
    //eating
    //не смог задать круг :/
    for(let i = 0; i < howMuchShrimps; i++){
    if (shrimpX[i] < correctShrimp(sclShrimp(362 + guraOffsetX)) && shrimpX[i] > correctShrimp(sclShrimp(322 + guraOffsetX))
        && shrimpY[i] < correctShrimp(sclShrimp(210 + guraOffsetY)) && shrimpY[i] > correctShrimp(sclShrimp(170 + guraOffsetY)) && isMouthOpen){
        // guraA.stop();
        guraA.pause();
        guraA.currentTime = 0;
        guraA.play();
        ++score;
        countShrimps();
        health+=Math.ceil(3000/howMuchShrimps); //+hp
        document.getElementById('score').innerHTML = score;
        newBallMulti(i);
    }
}
    
    isMouthOpen = !isMouthOpen;
}

let mouthLayer = 1;

let imgL1 = new Image(); //close                
    let imgL2 = new Image();
    let imgL3 = new Image();
    let imgL4 = new Image();
    let imgL5 = new Image();
    let imgL6 = new Image();
    let imgL7 = new Image();
    let imgL8 = new Image();
    let imgL9 = new Image(); //open

    imgL1.src = 'ph1s.png'; //close
    imgL2.src = 'ph2s.png';
    imgL3.src = 'ph3s.png';
    imgL4.src = 'ph4s.png';
    imgL5.src = 'ph5s.png';
    imgL6.src = 'ph6s.png';
    imgL7.src = 'ph7s.png';
    imgL8.src = 'ph8s.png';
    imgL9.src = 'ph9s.png'; //open
    
    let imgSad = new Image(); //gg :c
    imgSad.src = 'guraSad.jpg';

function darwGura(){
    ctx.beginPath();
    
    // ctx.drawImage(imgSad, 0, 0, 480, 320);

    // let imgOpen = new Image();
    // let imgClose = new Image();
    // imgOpen.src = 'guraOpen.png';
    // imgClose.src = 'guraClose.png'
    // if (isMouthOpen){

    // //sad test
    // // ctx.drawImage(imgSad, 280, 100, 220, 220);
    // ctx.drawImage(imgOpen, 280, 100, 220, 220);
    // }
    // else{
    //     ctx.drawImage(imgClose, 280, 100, 220, 220);
    // }            
    

    if (isMouthOpen){
        switch(mouthLayer){
            case 1:{
                drawSclImg(imgL2, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
                ++mouthLayer;
                break;
            }
            case 2:{
                drawSclImg(imgL3, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
                ++mouthLayer;
                break;
            }
            case 3:{
                drawSclImg(imgL4, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
                ++mouthLayer;
                break;
            }
            case 4:{
                drawSclImg(imgL5, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
                ++mouthLayer;
                break;
            }
            case 5:{
                drawSclImg(imgL6, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
                ++mouthLayer;
                break;
            }
            case 6:{
                drawSclImg(imgL7, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
                ++mouthLayer;
                break;
            }
            case 7:{
                drawSclImg(imgL8, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
                ++mouthLayer;
                break;
            }
            case 8:{
                drawSclImg(imgL9, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
                ++mouthLayer;
                break;
            }
            default:{
                drawSclImg(imgL9, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
                break;
            }
        }
    }
    else{
        //old
        // 280, 100, 220, 220
        //upd1
        // 115, 90, 510, 260
        drawSclImg(imgL1, 280 + guraOffsetX, 100 + guraOffsetY, 200, 220);
        mouthLayer = 1;
    }

    ctx.closePath();                                    
}

function draw(){
    if(triggerLeft && !triggerRight){
        guraOffsetX -= guraSpeed;
    }
    if(triggerRight && !triggerLeft){
        guraOffsetX += guraSpeed;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawing  
    drawBackground();                
    darwGura();                
    // darwBall();
    for(let i = 0; i < howMuchShrimps; i++){
        darwBallMulti(i);
    }
    
    
    //test ball (mouthPos)
    // ctx.beginPath();
    // ctx.arc(342, 190, 20, 0, Math.PI*2);
    // ctx.fillStyle = "#0095DD"
    // ctx.fill();
    // ctx.closePath();
    //------------


    //bouncing ball
    for(let i = 0; i < howMuchShrimps; i++){
        if (shrimpX[i] >= correctShrimp(sclX(470)) || shrimpX[i] <= correctShrimp(sclShrimp(10))){
            shrimpRevX[i] = !shrimpRevX[i];
        }
        if (shrimpY[i] >= correctShrimp(sclY(310)) || shrimpY[i] <= correctShrimp(sclShrimp(10))){
            shrimpRevY[i] = !shrimpRevY[i];
        }
        //paint
        if (shrimpRevX[i]){
            shrimpX[i] += dx;
        }
        else{
            shrimpX[i] -= dx;
        }

        if (shrimpRevY[i]){
            shrimpY[i] += dy;
        }
        else{
            shrimpY[i] -= dy;
        }
    }
    //--
    if(isMouthOpen){
        health -= 10;
    }
    else{
        --health;
    }
    if (health <= 0){
        gameOver();
    }
    $("health").innerHTML = health;

}
let dShark = 10;
let shark = setInterval(draw, dShark);

function gameOver(){
    clearInterval(shark);
    sadDoggo.play();
    health = 'blyad';
    $("health").innerHTML = health;

    ctx.beginPath();
    let imgSad = new Image();
    imgSad.src = 'guraSad.jpg';
    // ctx.drawImage(imgSad, 0, 0, sclX(480), sclY(320));
    drawSclImgEnd(imgSad, 0, 0, 480, 320);
    ctx.closePath();
    // tears();
    let cry = setInterval(tears, 360);
}

let tearX1 = sclX(300);
let tearY1 = sclY(195);

let tearX2 = sclX(210);
let tearY2 = sclY(185);

function tears(){
    //test ball (tear)

    ctx.beginPath();
    ctx.arc(tearX1, tearY1, 5, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD"
    ctx.fill();
    ctx.closePath();
    //------------
    ctx.beginPath();
    ctx.arc(tearX2, tearY2, 5, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD"
    ctx.fill();
    ctx.closePath();

    tearY1++;
    tearY2++;
}

const kinoko1 = new Audio("audio/kinoko1.mp3");
const kinoko2 = new Audio("audio/kinoko2.mp3");
const kinoko3 = new Audio("audio/kinoko3.mp3");

const nope1 = new Audio("audio/nope1.mp3");
const nope2 = new Audio("audio/nope2.mp3");
const nope3 = new Audio("audio/nope3.mp3");

const money = new Audio("audio/money.mp3");
const hehe = new Audio("audio/hehe.mp3");

const mmYes = new Audio("audio/mmYes.mp3");


let kinokoNum;

function kinoko(){
    kinokoNum = Math.ceil(Math.random()*3);
    console.log(kinokoNum);
    switch(kinokoNum){
        case 1:
            kinoko1.play();
            $('donation').hidden = false;
            break;
        case 2:
            kinoko2.play();
            break;
        case 3:
            kinoko3.play();
            break;

    }
}

function hehMoney(){
    money.play();

    $('donationNo').hidden = false;
    $('donationYes').hidden = false;    
}

let soYes = 0;

function noNo(){
    switch(soYes){
        case 0:
            nope1.play();
            soYes++;
            break;
        case 1:
            nope2.play();
            soYes++;
            break;
        case 2:
            nope3.play();
            soYes++;
            break;
        default:
            hehe.play();
            $('donationNo').hidden = true;    
            break;
    }
}

function donation(){
    mmYes.play();
    window.open('https://www.donationalerts.com/r/menselder','_blank');

}
