function newKinokoGame() {
    paused = false;
    kinokos = []; //only here
    rects = [];
    bones = [];
    //-- Cnt
    cntDog = 0;
    cntDogSpeed = 0;
    statusDog = 0;
    jumpDogTime = 0;
    isJumpDog = false
    health = 1;
    jimxFreq = 3000;
    //yDogPos = gameH07;
    liveTime = 0; //время игры

    backDef = 0; //номер актуального фона
    backVec = [godBack[0], godBack[0], godBack[0]];

    gameH07 = gameH * 0.5; // 0.3 -> 0.5 incr Dog Size
    yDogPos = gameH07; // Смещение собаки
    //- jump
    jumpDistance = gameH07;
    jumpCoef = jumpDistance / 245;
    //jumpCoef = 1.88;

    jumpDogSpeed = 7 * jumpCoef;
    //gravity = 0.1 * jumpCoef;

    //- hp
    $('hp').innerHTML = health;
    kinokoCreateCnt = 0;
    liveSpeed = 1;

    kinokos.push(new Kinoko());

    //--
    kinokoEngine();
    hide_menu();
}
let kinokoCreateCnt = 0;
let liveSpeed = 1;
let nwBgVec = [];

let currentNwBgVec0 = 0;
let currentNwBgVec1 = 0;
let currentNwBgVec2 = 0;
let currentNwBgVec3 = 0;
//-- newBg test
for (let i = 0; i <= 3; ++i) {
    const imgBack = new Image();
    let str = "./nwBgr/" + i + ".png";
    console.log(str);
    imgBack.src = str;
    nwBgVec.push(imgBack);
}

let nwBgVec0 = [nwBgVec[0], nwBgVec[0], nwBgVec[0]];
let nwBgVec1 = [nwBgVec[1], nwBgVec[1], nwBgVec[1]];
let nwBgVec2 = [nwBgVec[2], nwBgVec[2], nwBgVec[2]];
let nwBgVec3 = [nwBgVec[3], nwBgVec[3], nwBgVec[3]];

let nwBackCnt = 0; //
let nwBackCnt025 = 0; //

console.log('-- newBg test', nwBgVec);

function drawNewBg(){   
    ctx.drawImage(nwBgVec2[0], nwBackCnt025, 0, gameW, gameH); // trees
    ctx.drawImage(nwBgVec2[1], nwBackCnt025 + gameW, 0, gameW, gameH);

    ctx.drawImage(nwBgVec3[0], nwBackCnt025, 0, gameW, gameH / 4); // clouds
    ctx.drawImage(nwBgVec3[1], nwBackCnt025 + gameW, 0, gameW, gameH / 4);

    nwBackCnt025-=liveSpeed / 4;
    if (nwBackCnt025 < (-gameW)){        
        nwBackCnt025 = 0;
        nwBgVec2.splice(0, 1);
        nwBgVec3.splice(0, 1);

        nwBgVec2.push(nwBgVec2[currentNwBgVec2]);
        nwBgVec3.push(nwBgVec3[currentNwBgVec3]);
        // console.log(backVec);
    }

    ctx.drawImage(nwBgVec0[0], nwBackCnt, gameH - gameH / 80, gameW, gameH / 80); //ground
    ctx.drawImage(nwBgVec0[1], nwBackCnt + gameW, gameH - gameH / 80, gameW, gameH / 80); //ground

    ctx.drawImage(nwBgVec1[0], nwBackCnt, gameH - gameH / 6, gameW, gameH / 6); //gross
    ctx.drawImage(nwBgVec1[1], nwBackCnt + gameW, gameH - gameH / 6, gameW, gameH / 6); //gross
    
    nwBackCnt-=liveSpeed;
    if (nwBackCnt < (-gameW)){        
        nwBackCnt = 0;
        nwBgVec0.splice(0, 1);
        nwBgVec1.splice(0, 1);
        nwBgVec1.push(nwBgVec1[currentNwBgVec1]);
        nwBgVec0.push(nwBgVec0[currentNwBgVec0]);
        // console.log(backVec);
    }
}

//--
let kinokoSizeScale = Math.min(H, W) / 1000;
console.log("kinokoSizeScale: ", kinokoSizeScale);

let kinokos = [];

function Kinoko() {
    console.log("H, yDogpos", H, yDogPos);    

    this.size = [rect_size.x, rect_size.y];
    this.freqJmup = rand(0, W);

    console.log('kin {max, curr}: ', [W, this.freqJmup]);
    //this.color = rand(0, 1) ? 'one' : 'two';
    // this.position = [rand(0, gameW - rect_size.x), -rect_size.y];
    //this.position = [gameW + rect_size.x, rand(Math.ceil(gameH - rect_size.y) / 2, gameH - rect_size.y)];

    this.position = [gameW + rect_size.x, gameH - rect_size.y];
    this.constPosY = this.position[1];
    this.piTime = 2 * Math.PI;
    //---
    this.cntJmix = 0;
    this.status = 0;
    this.statusSpeed = 0;
    this.deleting = 0;
    this.alive = true;
}

Kinoko.prototype = {
    offSet: function(){        
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
        //jmix/kinoko jump

        
    },
    draw: function () {
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

//engine
function kinokoEngine() {
    if (paused) return;
    //deltaTime
    time = new Date().getTime();
    delta = time - oldTime;
    oldTime = time;

    gameSpeed = 0.001 * liveTime;
    //Update
    ctx.clearRect(0, 0, gameW, gameH);    
    darwBackground();
    drawNewBg();
    drawDog();
    //>
    let i = kinokos.length - 1;
    for (; i >= 0; i -= 1) {
        let k = kinokos[i];
        //условие

        // if ((r.position[0] + r.size[0]) < 0 && r.alive) {
        //     // if (r.color !== user_color){ //off igri
        //     //     gameStop();
        //     //     break;
        //     // }
        //     rects.splice(i, 1);
        //     console.log('delete');
        //     losing(0);
        //     continue;
        // }

        // r.position[1] += 0.05 * delta;
        k.position[0] -= 0.05 * delta + gameSpeed; //jmixSpeed
        k.draw();
    }
    let j = bones.length - 1;
    for (; j >= 0; j -= 1) {
        let b = bones[j];

        if (b.position[0] > gameW) {
            bones.splice(j, 1);
            
            // losing(1);

            continue;
        }
        //((this.size[1] / 4) * 3)
        for (let q = 0; q < kinokos.length; q++) { //poverka na Bonk ???
            if (b.position[0] > kinokos[q].position[0] && // oX, b за r
                b.position[0] <= (kinokos[q].position[0] + kinokos[q].size[0] * 1.2) &&
                (b.position[1] <= kinokos[q].position[1] + kinokos[q].size[1] / 4 * 3) &&
                b.position[1] + b.size[1] > kinokos[q].position[1] &&
                kinokos[q].alive) {
                console.log("Bonk !!");
                kinokos[q].Boom();
                bones.splice(j, 1);
                // kinokos.splice(q, 1);
                break;
            }
        }
        b.position[0] += 0.05 * 5 * delta;
        b.draw();
    }

    //Create
    // timer += delta;
    // if (timer > jimxFreq) {
    //     console.log('created: ', jimxFreq);
    //     kinokos.push(new Kinoko());
    //     timer = 0;
    //     if (jimxFreq > 1000) {
    //         jimxFreq -= Math.floor(liveTime * 0.01);

    //     }
    // }

    liveTime+=liveSpeed;
    $('score').innerHTML = liveTime;
    // if(liveTime === 2000) //включаем босс файт
    //     isBoss = true;
    kinokoCreateCnt += liveSpeed;
    if (kinokoCreateCnt >= 500){
        kinokos.push(new Kinoko());
        kinokoCreateCnt = 0;
    }



    requestAnimationFrame(kinokoEngine);
}