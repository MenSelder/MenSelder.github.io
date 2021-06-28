let $ = function (id) {
    return document.getElementById(id);
}

// $('title').innerHTML = "line0";

var paused = false;

let convas, ctx;

let W = window.innerWidth;
let H = window.innerHeight;

let user_color = 'one';

let COLOR = {
    one: 'red',
    two: 'green'
}

let isBoss = false;

let gameH = H;
let gameW = W;
let gameH07 = gameH * 0.7;
let health = 0; //hp

console.log([H, W]);
let rectSizeScale = Math.min(H, W) / 1000;
console.log("rectSizeScale: ", rectSizeScale);

//-- Счетчики
let cntDog = 0;
let cntDogSpeed = 0;
let statusDog = 0;
let jumpDogTime = 0;
let isJumpDog = false;
let liveTime = 0;
let jimxFreq = 3000;
let yDogPos = gameH07; // Смещение собаки

let backDef = 0; //номер актуального фона
let backVec = [];



// ------- IMG ---------
//0 -background
// 1-6 Attack dog
// 7-12 - моргающий дог (6)
// 13-16 / 13и15 одинаковые
// >> 
// 17-22(6) = jmixi
// 23-26(4) = bone
//
const posConst = 281.1 / (gameH - gameH07);
//281.1
console.log("posConst: ", posConst);
//pos bone scale

let god = [];
let godBack = [];

//<<<< <<< ,<< ,<< ,< ,<
function drawSclImg(r, x, y, w, h) {
    ctx.drawImage(r, sclShrimp(x), sclShrimp(y), sclShrimp(w), sclShrimp(h));
}

for (let i = 0; i <= 33; ++i) {
    const imgBack = new Image();
    imgBack.src = './ctDg/back.png';

    let str = "./ctDg/" + i + ".png";
    console.log(str);
    imgBack.src = str;
    god.push(imgBack);
    console.log(god[0]);

}

console.log(god);
//------
function losing(w){ // w = why? //1 = miss bone, 2 = jmix escaped
    console.log(w, " hp: ",  health - 1)
    if(health > 1)
        health--;
    else{        
        $('title').innerHTML = "You LOSE! YAAAAY";
        health = 0;
        pause();
    }
    $('cnt').innerHTML = "Score: " + liveTime;
    $('hp').innerHTML = health;
}
//--------------------------
let rects = [];

function new_game() {
    paused = false;
    rects = [];
    bones = [];

    gameH07 = gameH * 0.6;
    //-- Cnt
    cntDog = 0;
    cntDogSpeed = 0;
    statusDog = 0;
    jumpDogTime = 0;
    isJumpDog = false
    health = 3;
    jimxFreq = 3000;
    yDogPos = gameH07;
    liveTime = 0; //время игры

    backDef = 0; //номер актуального фона
    backVec = [godBack[0], godBack[0], godBack[0]];
    //- jump
    jumpDistance = gameH07;
    jumpCoef = jumpDistance / 245;

    jumpDogSpeed = 7 * jumpCoef;
    gravity = 0.1 * jumpCoef;

    isBoss = false;

    $('hp').innerHTML = health;

    //--
    engine();
    hide_menu();
}

//continue
function ctnChk(){
    if (health === 0)
        $('title').innerHTML = 'NO!'
    else ctn();
}

function ctn() {
    paused = false;
    engine();
    hide_menu();
}

function rand(min, max) { //случайное из диапазона 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let delta = 0,
    time = 0,
    timer = 0,
    oldTime = 0;


let rect_size = {
    x: 150 * rectSizeScale,
    y: 150 * rectSizeScale
}
//конструктор

// ctx.drawImage(god[24], 186, gameH07+58 , (gameH - gameH07)/3, (gameH - gameH07)/3);

// bone res: 384 x 359
function Bone(){
    //((gameH - gameH07)/3)*(500/384), ((gameH - gameH07)/3)*(500/384))
    this.size = [((gameH - gameH07)/3)*(500/384), ((gameH - gameH07)/3)*(500/384)];
    this.yPos = yDogPos;
    // console.log("yPos: ", this.yPos);
    //172, gameH07+42
    // this.position = [186, 58 + this.yPos];
    this.position = [172 / posConst, 42 / posConst + this.yPos];
    
    // console.log([this.position[0], this.position[1]]);
    this.status = 0;
    this.statusSpeed = 0;
}
Bone.prototype = {
    draw: function(){
        // // крутит сисКоординат (всё)
        // if (this.status === 8)
        //     this.status = 0;
        // // ctx.translate(this.position[0], this.position[1]);
        // ctx.rotate(Math.PI / this.status);        
        // this.status++;
        switch(this.status){
            case 0:{
                ctx.drawImage(god[28], this.position[0], this.position[1], this.size[0], this.size[1]);
                
                break;
            }
            case 1:{
        ctx.drawImage(god[29], this.position[0], this.position[1], this.size[0], this.size[1]);
                
                break;
            }
            case 2:{
        ctx.drawImage(god[30], this.position[0], this.position[1], this.size[0], this.size[1]);
                
                break;
            }
            case 3:{
        ctx.drawImage(god[31], this.position[0], this.position[1], this.size[0], this.size[1]);
                
                break;
            }
            case 4:{
        ctx.drawImage(god[32], this.position[0], this.position[1], this.size[0], this.size[1]);
                
                break;
            }
            case 5:{
        ctx.drawImage(god[33], this.position[0], this.position[1], this.size[0], this.size[1]);
                
                break;
            }
            default:{
                console.log("????");
                break;
            }
            
        }        
        this.statusSpeed++;
        if (this.statusSpeed === 7){
            this.statusSpeed = 0;

            this.status++;
            this.status = this.status % 6;
        }
    }
}

function Rect() {
    this.size = [rect_size.x, rect_size.y];
    this.color = rand(0, 1) ? 'one' : 'two';
    // this.position = [rand(0, gameW - rect_size.x), -rect_size.y];
    this.position = [gameW + rect_size.x, gameH - this.size[1]];
    this.constPosY = this.position[1];
    this.piTime = 2 * Math.PI;
    //---
    this.cntJmix = 0;
    this.status = 0;
    this.statusSpeed = 0;
    this.deleting = 0;
    this.alive = true;

    //-- jump settings
    this.jumpCoef = (gameH - this.size[1]) / 285
    this.gravity = gravity; //donot need?
    this.jumpSpeed = Math.random() * 7 * this.jumpCoef; //undef ? 
    //this.jumpSpeed = 7 * this.jumpCoef;

    this.jumpTime = 0;
    this.isJump = false;
    this.isJumpRev = false;
}

Rect.prototype = {
    printCoords: function(){
        console.log("posX: ", this.position)
    },
    offSet: function(){
        // console.log("OFFSET !",this.position[1]);

        // this.position[1] = rand(0, 1) ? this.position[1]-5 : this.position[1]+5;
        // if (this.position[1] > gameH - this.size[1]){
        //     this.position[1] = gameH - this.size[1];
        // }
        // if (this.position[1] < 0){
        //     this.position[1] = 0;
        // }
        // console.log("OFFSET2 !",this.position[1]);
        //----- sin / cos -----
        // switch(this.color){
        //     case 'one': 
        //         this.position[1] = this.constPosY + 100 * Math.sin((this.position[0] / 40));
        //         break;
        //     case 'two':
        //         this.position[1] = this.constPosY + 100 * Math.cos((this.position[0] / 40));
        //         break;
        //     default:
        //         break;
        // }

        if (this.position[1] > gameH - this.size[1]){
            this.position[1] = gameH - this.size[1];
        }
        if (this.position[1] < 0){
            this.position[1] = 0;
        }
        // console.log("sin ", this.position[0], " = ", Math.sin(this.position[0]));
        //****************cos sin Better *****
        
    },
    jump: function(){
        // ?//?
    },
    draw: function () {
        if (Math.random() < 0.01){ //jump started
            this.isJump = true;
            console.log("JUMPED! ", this.position, [this.jumpSpeed, this.gravity, this.jumpTime])
        }
        // jump func

        if (this.isJump){ 

            this.position[1] -= this.jumpSpeed - this.gravity * this.jumpTime;
            this.jumpTime++;

            if(this.position[1] >= gameH - this.size[1]){
                this.isJump = false;
                this.position[1] = gameH - this.size[1];
                // console.log("jumping endo");
                this.jumpTime = 0;
                this.jumpSpeed = Math.random() * 7 * this.jumpCoef; //

            }
        }


        //----
        this.offSet();
        switch(this.status){
            case 0:{
                ctx.drawImage(god[17], this.position[0], this.position[1], this.size[0] * 1.2, this.size[1]);
                // //testLine  
                // ctx.beginPath();
                // ctx.fillStyle = "red";
                // ctx.rect( this.position[0], (this.position[1] / 10) * 10, this.size[0] * 1.2, (this.size[1] / 4) * 3);
                // ctx.stroke();
                //---
                if (this.statusSpeed === 7){
                    this.statusSpeed = 0;
                    this.status = 1;
                }

                break;
            }
            case 1:{
                ctx.drawImage(god[18], this.position[0], this.position[1], this.size[0] * 1.2, this.size[1]);
                // //testLine  
                // ctx.beginPath();
                // ctx.fillStyle = "red";
                // ctx.rect( this.position[0], this.position[1], this.size[0] * 1.2, (this.size[1] / 4) * 3);
                // ctx.stroke();
                //---
                if (this.statusSpeed === 7){
                    this.statusSpeed = 0;
                    this.status = 0;
                }

                break;
            }
            case 2:{
                ctx.drawImage(god[20], this.position[0], this.position[1], this.size[0] * 1.2, this.size[1]);
                if (this.statusSpeed === 7){
                    this.statusSpeed = 0;
                    this.status = 3;
                }
                break;
            }
            case 3:{
                ctx.drawImage(god[21], this.position[0], this.position[1], this.size[0] * 1.2, this.size[1]);
                if (this.statusSpeed === 7){
                    this.statusSpeed = 0;
                    this.status = 4;
                }

                break;
            }
            case 4:{
                ctx.drawImage(god[22], this.position[0], this.position[1], this.size[0] * 1.2, this.size[1]);
                // console.log("deleting:s ", this.deleting);

                if (this.statusSpeed === 7){
                    this.deleting = 1;
                    // console.log("deleting:n ", this.deleting);
                }

                break;
            }
            default:{

                break;
            }
        }

        // ctx.fillRect(this.position[0], this.position[1], this.size[0], this.size[1]);
        // if(this.statusSpeed === 7){
        //     this.status = (this.status + 1) % 2;
        //     this.statusSpeed = 0;
        // }
        this.statusSpeed++;

    },
    Boom: function(){
        // this.deleting = del;
        this.alive = false;
        this.statusSpeed = 0;
        this.status = 2;
    }
}

// let backSpeed = 3;
// let backCnt = 0;
// function darwBackground() {
//     ctx.drawImage(god[0], Math.floor(backCnt / backSpeed), 0, gameW * 1.1, gameH); // 1 - 16

//     backCnt--;
//     if (backCnt < -(Math.ceil(gameW / 1.1) * backSpeed)){
//         backCnt = 0;
//     }
// }

for (let i = 0; i <= 1; ++i) {
    const imgBack = new Image();
    let str = "./backVec/" + i + ".png";
    console.log(str);
    imgBack.src = str;
    godBack.push(imgBack);
}

for (let i = 2; i <= 7; ++i) {
    const imgBack = new Image();
    let str = "./backVec/" + i + ".jpg";
    console.log(str);
    imgBack.src = str;
    godBack.push(imgBack);
}





let backSpeed = 5;
let backCnt = 0; //
function darwBackground() {
    ctx.drawImage(backVec[0], backCnt, 0, gameW , gameH); //
    ctx.drawImage(backVec[1], backCnt + gameW, 0, gameW , gameH); //

    backCnt-=backSpeed;
    if (backCnt < (-gameW)){        
        backCnt = 0;
        backVec.splice(0, 1);
        backVec.push(godBack[backDef]);
        // console.log(backVec);
    }
}

function nextBackgr(){
    if (backDef === 7)
        backDef = 0;
    else
        backDef++;
}
//---- статусы собаки ---
// let statusDog = 0;

function justRunDog(){
    statusDog = 0;
    cntDog = 0;
}

let attackOnce;
function attackDog(){
    statusDog = 1;
    attackOnce = true;
    cntDog = 0;
}
function jmerikDog(){
    nextBackgr()
    statusDog = 2;
    cntDog = 0;
}
// -- JUMP --
let jumpCoef = 1; //коэф = jumpDistance(действующий) / 245
let jumpDogSpeed = 7; //сила жумпа
let gravity = 0.1; //g

// let jumpDogTime = 0;


// let isJumpDog = false;

let jumpDistance;

//let isJumpDogReverse = false;
function jumpDog(){
    timeJump = 0;
    console.log("{jumpCoef, jumpDogSpeed, g}", [jumpCoef, jumpDogSpeed, gravity]);
    isJumpDog = true;
}
//-- event 
addEventListener("keydown", eventSwitch);

function eventSwitch(event){
    // console.log("event: ", event, event.keyCode);
    switch(event.keyCode){
    case 32:{
        jumpDog();
        break;
    }
    case 13:{
        attackDog()
        break;
    }
    default:{
        jmerikDog();
        break;
    }
    }
}

//---
// let cntDog = 0;
// let cntDogSpeed = 0;
function drawDog() {

    switch(statusDog){
        case 0:{ //justRun
            // // cntDog = 0;
            ctx.drawImage(god[(cntDog % 4)+ 13], 0, yDogPos , gameH - gameH07, gameH - gameH07); // 1 - 16

            // //testGavna
            // ctx.drawImage(god[3], 0, gameH07 , gameH - gameH07, gameH - gameH07);
            // ctx.drawImage(god[24], 186, gameH07+58 , ((gameH - gameH07)/3), (gameH - gameH07)/3);

            // //bone
            // if(cntDog%2 === 0)
            // ctx.drawImage(god[28], 172, gameH07+42 , ((gameH - gameH07)/3)*(500/384), ((gameH - gameH07)/3)*(500/384));
            // ctx.drawImage(god[23], 185, gameH07+158 , (gameH - gameH07)/3, (gameH - gameH07)/3);

            break;
        }
        case 1:{ //attack
            ctx.drawImage(god[(cntDog % 6)+ 1], 0, yDogPos , gameH - gameH07, gameH - gameH07); // 1 - 16
            
            if(cntDog === 2 && attackOnce === true && cntDogSpeed === 7){
                throwBone();
                attackOnce = false;
            }
            if (cntDog >= 6){
                justRunDog();
            }

            break;
        }
        case 2:{ //jmerik
            ctx.drawImage(god[(cntDog % 6)+ 7], 0, yDogPos , gameH - gameH07, gameH - gameH07); // 1 - 16
            if (cntDog >= 6){
                justRunDog();
            }

            break;
        }
        default:{
            justRunDog();
            break;
        }
    }
    //----------------РофлоПрыжок
    // if (isJumpDog && !isJumpDogReverse){
    //     console.log("uping");
    //     yDogPos-=jumpDogSpeed; 
    //     if (yDogPos <= 0)
    //         isJumpDogReverse = true;
    // }
    // if (isJumpDog && isJumpDogReverse){
    //     console.log("downing")

    //     yDogPos+=jumpDogSpeed; 
    //     if (yDogPos >= gameH07){
    //         isJumpDogReverse = false;
    //         isJumpDog = false;
    //     }
    // }
    //---------- Физицеский 
    if (isJumpDog){ 
        timeJump++;
        if(yDogPos > minHihgt){ //счетчик высоты
            minHihgt = yDogPos;
        }
        console.log("jumping{H, max, min, curr,del, time:}", [H, maxHihgt, minHihgt, yDogPos, minHihgt-maxHihgt, jumpDogTime], [gravity, jumpDogSpeed]);
        //--
        gravity = 0.1 * jumpCoef; // g
        yDogPos -= jumpDogSpeed - gravity * jumpDogTime;
        //-
        if (maxHihgt > yDogPos){ //счетчик высоты
            maxHihgt = yDogPos;
        }
        //-
        jumpDogTime++;
        if(yDogPos >= gameH07){
            isJumpDog = false;
            yDogPos = gameH07;
            // console.log("jumping endo");
            jumpDogTime = 0;
        }
    }

    function throwBone(){
        bones.push(new Bone());
        // bones[bones.length - 1].yDogPos = yPos;
        console.log("throwBone!");
    }


    // ctx.drawImage(god[cntDog + 1], 0, gameH07 , gameH - gameH07, gameH - gameH07); // 1 - 16
    // ------- IMG ---------
    //0 -background
    // 1-6 Attack dog
    // 7-12 - моргающий дог (6)
    // 13-16 / 13и15 одинаковые

    if (cntDogSpeed === 7) { //speed
        cntDogSpeed = 0;
        cntDog++;
        cntDog = cntDog % 16;
    }
    cntDogSpeed++;

    // cntDog++;
}
let timeJump = 0;
let maxHihgt = H; //измерение высоты
let minHihgt = 0; //измерение высоты 



// счетчик кадров
// let liveTime = 0;
let gameSpeed;
// let jximFreq = 3000; //частота спавена жмыхов

function engine() {
    if (paused) return;
    //deltaTime
    time = new Date().getTime();
    delta = time - oldTime;
    oldTime = time;

    gameSpeed = 0.001 * liveTime;
    // console.log(time);
    // console.log(delta);

    //Update
    ctx.clearRect(0, 0, gameW, gameH);
    //----------- Back ----------------------
    // ctx.drawImage(god[0], 0, 0, gameW, gameH); // 1 - 16
    darwBackground();

    // ctx.drawImage(god[cnt + 1], 0, 0, gameW, gameH07);
    // ctx.drawImage(god[cnt + 1], 0, gameH07 , gameH - gameH07, gameH - gameH07); // 1 - 16
    drawDog();

    if (!isBoss){ // обычный режим
        let i = rects.length - 1;
        for (; i >= 0; i -= 1) {
            let r = rects[i];

            if (r.deleting) {
                // if (r.color !== user_color){ //off igri
                //     gameStop();
                //     break;
                // }
                rects.splice(i, 1);
                console.log('delete KEKW');
                continue;
            }
            if ((r.position[0] + r.size[0]) < 0 && r.alive) {
                // if (r.color !== user_color){ //off igri
                //     gameStop();
                //     break;
                // }
                rects.splice(i, 1);
                console.log('delete');
                losing(0);
                continue;
            }

            // r.position[1] += 0.05 * delta;
            r.position[0] -= 0.05 * delta + gameSpeed; //jmixSpeed
            r.draw();

            //r.printCoords()
        }
        let j = bones.length - 1;
        for(; j >=0; j -= 1){
            let b = bones[j];

            if (b.position[0] > gameW){
                bones.splice(j, 1);
                console.log("bone del");
                losing(1);

                continue;
            }
            //((this.size[1] / 4) * 3)
            for(let q = 0; q < rects.length;q++){ //poverka na Bonk ???
                if (b.position[0] > rects[q].position[0] &&  // oX, b за r
                    b.position[0] <= (rects[q].position[0] + rects[q].size[0] * 1.2) &&
                    (b.position[1] <= rects[q].position[1] + rects[q].size[1] / 4 * 3) && 
                        b.position[1] + b.size[1] > rects[q].position[1] &&
                            rects[q].alive){
                            console.log("Bonk !!");
                            rects[q].Boom();
                            bones.splice(j, 1);
                            // rects.splice(q, 1);
                            break;
                        }
            }
            b.position[0] += 0.05 * 5 * delta;
            b.draw();
        }

        //Create
        timer += delta;
        if (timer > jimxFreq) {
            console.log('created: ', jimxFreq);
            rects.push(new Rect());
            // coords print
            // for (rct in rects){
            //     rct.printCoords();

            // }
            //--
            timer = 0;
            if (jimxFreq > 1000){
                jimxFreq -= Math.floor(liveTime * 0.01);

            }
        }
        
        liveTime++;
        $('score').innerHTML = liveTime;
        // if(liveTime === 2000) //включаем босс файт
        //     isBoss = true;
    }
    else{ // BOSS   
        //Повтор из обычного
        let i = rects.length - 1;
        for (; i >= 0; i -= 1) {
            let r = rects[i];

            if (r.deleting) {
                // if (r.color !== user_color){ //off igri
                //     gameStop();
                //     break;
                // }
                rects.splice(i, 1);
                console.log('delete KEKW');
                continue;
            }
            if ((r.position[0] + r.size[0]) < 0 && r.alive) {
                // if (r.color !== user_color){ //off igri
                //     gameStop();
                //     break;
                // }
                rects.splice(i, 1);
                console.log('delete');
                losing(0);
                continue;
            }
            r.position[0] -= 0.05 * delta + gameSpeed; //jmixSpeed
            r.draw();
        }
        let j = bones.length - 1;
        for(; j >=0; j -= 1){
            let b = bones[j];

            if (b.position[0] > gameW){
                bones.splice(j, 1);
                console.log("bone del");
                losing(1);

                continue;
            }
            //((this.size[1] / 4) * 3)
            for(let q = 0; q < rects.length;q++){ //poverka na Bonk ???
                if (b.position[0] > rects[q].position[0] &&  // oX, b за r
                    b.position[0] <= (rects[q].position[0] + rects[q].size[0] * 1.2) &&
                    (b.position[1] <= rects[q].position[1] + rects[q].size[1] / 4 * 3) && 
                        b.position[1] + b.size[1] > rects[q].position[1] &&
                            rects[q].alive){
                            console.log("Bonk !!");
                            rects[q].Boom();
                            bones.splice(j, 1);
                            // rects.splice(q, 1);
                            break;
                        }
            }
            b.position[0] += 0.05 * 5 * delta;
            b.draw();
        }
        //************
        console.log("boss");

    }

    requestAnimationFrame(engine);
}

function gameStop() {
    pause();
}

function set(clr) {
    user_color = clr;
    deadline.style.background = COLOR[clr];
}


function init() {
    canvas = $("canvas");

    canvas.width = W;
    // canvas.height = (H / 100) * 70 + 1;
    canvas.height = H;
    ctx = canvas.getContext('2d');
    // $('deadline').style.background = COLOR[user_color];
    // $('one').style.background = COLOR.one;
    // $('two').style.background = COLOR.two;

    // const imgBack = new Image(); 
    // imgBack.src = './cutDog/back.png';
}
function pauseBtn() {
    $('title').innerHTML = "Continue?";
    $('cnt').innerHTML = "Continue with score: " + liveTime;
    pause();
}
function pause() {
    paused = true;
    show_menu();
}

function show_menu() {
    $('menu').hidden = false;
}

function hide_menu() {
    $('menu').hidden = true;
}