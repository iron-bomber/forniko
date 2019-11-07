class Game {

    constructor(){
        this.playerArr = [];
        this.spriteArr = [];
        this.bombMap = [];
    }
    // Creates bomber and places him in bomber array
    createPlayer(color, x, y, iGrid, jGrid, num) {
        this.playerArr.push(new Bomber(color, x, y, iGrid, jGrid, num)); 
    }

    // Creates a sprite for each bomber
    createSprite(left, right, up, down, death, lastPressed, bomberID, height) {
        this.spriteArr.push(new Sprite(left, right, up, down, death, lastPressed, bomberID, height));
    }

    //Draws the map based on the 2d Array m.bombMap
    createMap() {
        var leftWall = new Image();
        leftWall.src="./Images/leftWall.png";
        var rock = new Image();
        rock.src="./Images/rock.png";
        let xCoord = 0;
        let yCoord = 0;
        for(let i = 0; i < m.bombMap.length; i++) {
            for (let j = 0; j < m.bombMap.length; j++) {
                if (m.bombMap[i][j] === 'wall') {
                    ctx.drawImage(rock, 256, 128, 64, 64, xCoord, yCoord, 50, 50);
                    xCoord += 50;
                } else if (m.bombMap[i][j] === 'rock') {
                    ctx.drawImage(rock, 0, 128, 64, 64, xCoord, yCoord, 50, 50);
                    xCoord += 50;
                }else if (typeof m.bombMap[i][j] === 'object') {
                    ctx.drawImage(rock, 128, 64, 64, 64, xCoord, yCoord, 50, 50);
                    //bomb Gray
                    ctx.fillStyle = '#C0C0C0';
                    ctx.beginPath();
                    ctx.arc(xCoord + 25, yCoord + 25, 12, 0, 2 * Math.PI);
                    ctx.fill();
                    xCoord += 50;
                } else if (typeof m.bombMap[i][j] === 'number') {
                    // ctx.fillStyle = 'green';
                    // ctx.fillRect(xCoord, yCoord, 50, 50);
                    //explosion orange
                    ctx.fillStyle = '#FF9900';
                    ctx.fillRect(xCoord, yCoord, 50, 50);
                    xCoord += 50;
                } else if(m.bombMap[i][j] === 'bombpower'){
                    ctx.drawImage(rock, 128, 64, 64, 64, xCoord, yCoord, 50, 50);
                    ctx.fillStyle = 'red';
                    ctx.fillRect(xCoord+15, yCoord+15, 20, 20);
                    xCoord += 50;
                }
                else if(m.bombMap[i][j] === 'extrabomb'){
                    ctx.drawImage(rock, 128, 64, 64, 64, xCoord, yCoord, 50, 50);
                    ctx.fillStyle = 'cyan';
                    ctx.fillRect(xCoord+15, yCoord+15, 20, 20);
                    xCoord += 50;
                }
                else if(m.bombMap[i][j] === 'speed'){
                    ctx.drawImage(rock, 128, 64, 64, 64, xCoord, yCoord, 50, 50);
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(xCoord+15, yCoord+15, 20, 20);
                    xCoord += 50;    
                }
                else {
                    ctx.drawImage(rock, 128, 64, 64, 64, xCoord, yCoord, 50, 50);
                    xCoord += 50;
                }
            }
            yCoord += 50;
            xCoord = 0;
        }

    }
}

let go = true;
socket.on('ram', (data) =>{
    if(data){
        if(selectScreen === true){
            selectLoop();
        }
        if(startScreen === true){
            startLoop()
        }
        if(mainGame === true){
            mainLoop()
        }
    }
})
        
function mainLoop(){
    // console.log('mainloop')
    console.log(playersLeft)
            
    if (playersLeft === 1) {
        console.log('players left is one, resetting game')
        for(let i = 0; i < g.playerArr.length; i++) {
            if (typeof g.playerArr[i] === 'object') {
                playerScores[`p${i+1}`] += 1;
                for (let j = 0; j < numOfPlayers; j++) {
                    console.log(`Player ${j+1} score: ${playerScores[`p${j+1}`]}`);
                }
            }
        }

        playersLeft = 0;
        gameReset = true;
        setTimeout(()=>{                        //After 5 seconds, tells server to reset round
            socket.emit('clearMainInterval');
            socket.emit('start');
        }, 5000)
    }
    
    //GRID PLACER & MoveCheck
    for (let i = 0; i < g.playerArr.length; i++) {
        // console.log(g.playerArr.length)
        if(g.playerArr[i] !== ''){
            // console.log(g.playerArr[i])
            g.playerArr[i].gridPlacer();
            if(g.playerArr[i].moveUp || g.playerArr[i].moveDown || g.playerArr[i].moveLeft || g.playerArr[i].moveRight){
                g.playerArr[i].move();
            }
        }
    }
    //Clear canvas
    ctx.clearRect(0, 0, 750, 750);
    g.createMap();
    // Updates player attributes
    // for (let i = 0; i < g.playerArr.length; i++) {
    //     document.getElementById(`p${i+1}-pwr`).innerText = `Bomb Power: ${g.playerArr[i].bombPower}`;
    //     document.getElementById(`p${i+1}-bmb`).innerText = `Total Bombs: ${g.playerArr[i].bombAmmo}`;
    //     document.getElementById(`p${i+1}-spd`).innerText = `Speed: ${g.playerArr[i].speed}`;
    // }

    // Drawing Player
    // for (let i = 0; i < g.playerArr.length; i++) {
    //     g.drawPlayer(g.playerArr[i]);
    // }
    if (playerOneDead) {
        g.spriteArr[0].drawDeath(playerOneX, playerOneY);
    }
    if (playerTwoDead) {
        g.spriteArr[1].drawDeath(playerTwoX, playerTwoY);
    }

    
    
    //PLAYER SPRITES
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    for (let i = 0; i < g.playerArr.length; i++) {
        if (g.playerArr[i].moveLeft == true && g.playerArr[i].moveRight == true && g.playerArr[i].moveUp == true){
            g.spriteArr[i].drawImgUp();
        }
        else if (g.playerArr[i].moveLeft == true && g.playerArr[i].moveRight == true && g.playerArr[i].moveDown == true){
            g.spriteArr[i].drawImgDown()
        }else if  
        (  g.playerArr[i].moveLeft == true && g.playerArr[i].moveRight == true
            || g.playerArr[i].moveUp == true && g.playerArr[i].moveDown == true
            || g.playerArr[i].moveLeft == true && g.playerArr[i].moveRight == true && g.playerArr[i].moveUp == true && g.playerArr[i].moveDown == true
            || g.playerArr[i].moveLeft == true && g.playerArr[i].moveRight == true && g.playerArr[i].moveUp == true && g.playerArr[i].moveDown == true
            || g.playerArr[i].moveLeft == false && g.playerArr[i].moveRight == false && g.playerArr[i].moveUp == false && g.playerArr[i].moveDown == false
            ){
                g.spriteArr[i].drawImgIdle();
            }
            else if(g.playerArr[i].moveLeft == true){
                g.spriteArr[i].drawImgLeft()
            }else if(g.playerArr[i].moveRight == true){
                g.spriteArr[i].drawImgRight()
            }else if(g.playerArr[i].moveUp == true){
                g.spriteArr[i].drawImgUp()
            }else if(g.playerArr[i].moveDown == true){
                g.spriteArr[i].drawImgDown()
            }
        }


        //SHOW ROUND VICTORY SCREEN
        // if(playersLeft === 0){
        //     victoryScreen();
        // }
        
        
    }// END OF MAIN LOOP
    
    
    let players;
    
    socket.on('newPlayer', (data) => {
        players = data[1];
        console.log(players);
        console.log(`New player, ${data[0]}, number of players: ${players.length}`);
    });

socket.on('movement', (data) => {
    // console.log('receving server movement')
    if(mainGame){
        g.playerArr[players.indexOf(data.playerID)].moveRight = data.right;
        g.playerArr[players.indexOf(data.playerID)].moveLeft = data.left;
        g.playerArr[players.indexOf(data.playerID)].moveUp = data.up;
        g.playerArr[players.indexOf(data.playerID)].moveDown = data.down;
        g.spriteArr[players.indexOf(data.playerID)].lastPressed = data.tempPressed;
        if(data.bomb){
            if(g.playerArr[players.indexOf(data.playerID)].bombAmmo > 0){
                if (m.bombMap[g.playerArr[players.indexOf(data.playerID)].iGrid][g.playerArr[players.indexOf(data.playerID)].jGrid] === 'free') {
                    // Create new bomb (player, player Y, player X, player bomb power, bomb ID)
                    let newBomb = (new Bomb(g.playerArr[players.indexOf(data.playerID)], g.playerArr[players.indexOf(data.playerID)].iGrid, g.playerArr[players.indexOf(data.playerID)].jGrid, g.playerArr[players.indexOf(data.playerID)].bombPower, bombIDs));
                    bombIDs++;
                    newBomb.gridPlacer();
                    newBomb.timerExplode();
                    g.playerArr[players.indexOf(data.playerID)].bombAmmo -= 1;
                }
            }   
        }
    }
    if(selectScreen){
        // console.log(data);
        let up = data.up;
        let down = data.down;
        let spacebar = data.bomb;
        let on = data.on;
        // console.log(sel)
        if(host){
            if(up){
                sel.movePosition(sel.p1, "w")
            }
            if(down){
                sel.movePosition(sel.p1, "s")
            }
            if(spacebar){
                socket.emit('startscreen')
            }
        }
    }
    if(startScreen){
        // console.log(data);
        
        g.playerArr[players.indexOf(data.playerID)].moveRight = data.right;
        g.playerArr[players.indexOf(data.playerID)].moveLeft = data.left;
        g.playerArr[players.indexOf(data.playerID)].moveUp = data.up;
        g.playerArr[players.indexOf(data.playerID)].moveDown = data.down;
        g.spriteArr[players.indexOf(data.playerID)].lastPressed = data.tempPressed;
        if(data.bomb){
            if(g.playerArr[players.indexOf(data.playerID)].bombAmmo > 0){
                if (m.bombMap[g.playerArr[players.indexOf(data.playerID)].iGrid][g.playerArr[players.indexOf(data.playerID)].jGrid] === 'free') {
                    // Create new bomb (player, player Y, player X, player bomb power, bomb ID)
                    let newBomb = (new Bomb(g.playerArr[players.indexOf(data.playerID)], g.playerArr[players.indexOf(data.playerID)].iGrid, g.playerArr[players.indexOf(data.playerID)].jGrid, g.playerArr[players.indexOf(data.playerID)].bombPower, bombIDs));
                    bombIDs++;
                    newBomb.gridPlacer();
                    newBomb.timerExplode();
                    g.playerArr[players.indexOf(data.playerID)].bombAmmo -= 1;
                }
            }   
        }
    }
});

socket.on('startscreen', ()=>{
    selectScreen = false;
    startScreen = true;
})
        
        
let g = new Game();
let m;
function initializeGame(data) {
    g = new Game();
    m = data;
    playerOneDead = false;
    playerTwoDead = false;
    g.createPlayer('red', 60, 75, 1, 1, 1);
    g.createSprite(p1Left, p1Right, p1Up, p1Down, p1Death, 'down', 0, spriteHeight1);
    g.createPlayer('blue', 760, 760, 15, 15, 2);
    g.createSprite(p2Left, p2Right, p2Up, p2Down, p2Death, 'down', 1, spriteHeight2);
    // g.createPlayer('yello', 760, 60, 1, 1, 3);
    // g.createSprite(p1Left, p1Right, p1Up, p1Down, p1Death, 'down', 0, spriteHeight1);
    // g.createPlayer('green', 60, 760, 15, 15, 4);
    // g.createSprite(p2Left, p2Right, p2Up, p2Down, p2Death, 'down', 1, spriteHeight2);
    numOfPlayers = g.playerArr.length;
    playersLeft = g.playerArr.length;
    startMovement(); //Start movement emission to server
    setTimeout(() => {
        gameReset = false;
    }, 2999);
}


//TELLS THIS CLIENT TO RESTART GAME
// socket.on('start-game', (data) => {
//     initializeGame(data);
//     mainLoop();
// }) 

//TELLS THIS CLIENT TO Selectscreen
socket.on('start-game', ()=>{
    selectLoop();
}) 

socket.on('youhost', ()=>{
    console.log('you are the host')
    host = true;
}) 




class Startscreen{
    constructor(){
        this.p1 = {
            exists: true,
            position: 1,
            sprite: 1
        };
        this.p2 = {
            exists: true,
            position: 1,
            sprite: 1
        };
        this.p3 = {
            exists: false,
            position: 1,
            sprite: 1
        };
        this.p4 = {
            exists: false,
            position: 1,
            sprite: 1
        };
        this.sprite1 = true;
        this.sprite2 = true;
        this.sprite3 = true;
        this.sprite4 = true;
    }

    movePosition(player, input){
        
        switch(input){
            case "w":
                
                if(player.position == 3){
                    player.position = 1;
                }
                if(player.position == 4){
                    player.position = 2;
                }
                if(player.position == 5){
                    player.position = 3;
                }
                if(player.position == 6){
                    player.position = 4;
                }
                break;
            case "a":
                
                if(player.position == 2){
                    player.position = 1;
                }
                if(player.position == 4){
                    player.position = 3;
                }
                if(player.position == 6){
                    player.position = 5;
                }
                break;
            case "s":
                
                if(player.position == 1){
                    player.position = 3;
                }
                else if(player.position == 2){
                    player.position = 4;
                }
                else if(player.position == 3){
                    player.position = 5;
                }
                else if(player.position == 4){
                    player.position = 6;
                }
                break;
            case "d":
                
                if(player.position == 1){
                    player.position = 2;
                }
                if(player.position == 3){
                    player.position = 4;
                }
                if(player.position == 5){
                    player.position = 6;
                }
                break;
            
            case "spacebar":
                
                if(player.exists == true){
                    if(player.position == 1 && this.sprite1 == true){
                        this.sprite1 = false;
                        player.sprite = 1;
                        // player.exists = false;
                        //The Player.id gets that sprite
                    }
                    if(player.position == 2  && this.sprite2 == true){
                        this.sprite2 = false;
                        player.sprite = 2;
                        // player.exists = false;
                        //The Player.id gets that sprite
                    }
                    if(player.position == 3  && this.sprite3 == true){
                        this.sprite3 = false;
                        player.sprite = 3;
                        // player.exists = false;
                        //The Player.id gets that sprite
                    }
                    if(player.position == 4  && this.sprite4 == true){
                        this.sprite4 = false;
                        player.sprite = 4;
                        // player.exists = false;
                        //The Player.id gets that sprite
                    }
                    if(player.position == 5){
                        initializeGame(); 
                        mainLoopable(); 
                        gameRunning = true; 
                        commands();
                    }
                    if(player.position == 6){
                        initializeGame(); 
                        mainLoopable(); 
                        gameRunning = true; 
                        commands();
                    }
                }
                break;
        }
    }

    drawBorder(player){
        
        if(player.exists == true){
            if(player.position == 1){
                ctx.drawImage(border, 0, 0, 560, 939, 170, 125, 190, 180);//Top Left
            }
            if(player.position == 2){
                ctx.drawImage(border, 0, 0, 560, 939, 468, 125, 190, 180);//Top Right
            }
            if(player.position == 3){
                ctx.drawImage(border, 0, 0, 560, 939, 170, 325, 190, 180);//Bottom Left
            }
            if(player.position == 4){
                ctx.drawImage(border, 0, 0, 560, 939, 468, 325, 190, 180);//Bottom Right
            }
            if(player.position == 5){
                ctx.drawImage(border2, 0, 0, 940, 560, 268, 545, 320, 140);//Ready button
            }
            if(player.position == 6){
                ctx.drawImage(border2, 0, 0, 940, 560, 268, 545, 320, 140);//Ready button
            }
        }
    }

    drawIcons(){
        if(this.sprite1){
            ctx.drawImage(p1Icon, 0, 0, iconWidth, spriteHeight1, 200, 150, 150, 130);
        }else{
            ctx.globalAlpha = .5;
            ctx.drawImage(p1Icon, 0, 0, iconWidth, spriteHeight1, 200, 150, 150, 130);
            ctx.globalAlpha = 1;
        }
        if(this.sprite2){
            ctx.drawImage(p2Icon, 0, 0, iconWidth, spriteHeight2, 505, 150, 150, 130);
        }else{
            ctx.globalAlpha = .5;
            ctx.drawImage(p2Icon, 0, 0, iconWidth, spriteHeight2, 505, 150, 150, 130);
            ctx.globalAlpha = 1;
        }
        if(this.sprite3){
            ctx.drawImage(p3Icon, 0, 0, iconWidth, spriteHeight1, 205, 350, 150, 130);
        }else{
            ctx.globalAlpha = .5;
            ctx.drawImage(p3Icon, 0, 0, iconWidth, spriteHeight1, 205, 350, 150, 130);
            ctx.globalAlpha = 1;
        }
        if(this.sprite4){
            ctx.drawImage(p4Icon, 0, 0, iconWidth, spriteHeight1, 500, 350, 150, 130);
        }else{
            ctx.globalAlpha = .5;
            ctx.drawImage(p4Icon, 0, 0, iconWidth, spriteHeight1, 500, 350, 150, 130);
            ctx.globalAlpha = 1;
        }
    }
}

function spriteChooser(){
    console.log('choosing')
    switch (s.p1.sprite){
        case 1:
            p11 = p1Left;
            p12 = p1Right;
            p13 = p1Up;
            p14 = p1Down;
            p15 = p1Death;
            break;
        case 2:
            p11 = p2Left;
            p12 = p2Right;
            p13 = p2Up;
            p14 = p2Down;
            p15 = p2Death;
            break;
        case 3:
            p11 = p3Left;
            p12 = p3Right;
            p13 = p3Up;
            p14 = p3Down;
            p15 = p3Death;
            break;
        case 4:
            p11 = p4Left;
            p12 = p4Right;
            p13 = p4Up;
            p14 = p4Down;
            p15 = p4Death;
            break;
    }
    switch (s.p2.sprite){
        case 1:
            p21 = p1Left;
            p22 = p1Right;
            p23 = p1Up;
            p24 = p1Down;
            p25 = p1Death;
            break;
        case 2:
            p21 = p2Left;
            p22 = p2Right;
            p23 = p2Up;
            p24 = p2Down;
            p25 = p2Death;
            break;
        case 3:
            p21 = p3Left;
            p22 = p3Right;
            p23 = p3Up;
            p24 = p3Down;
            p25 = p3Death;
            break;
        case 4:
            p21 = p4Left;
            p22 = p4Right;
            p23 = p4Up;
            p24 = p4Down;
            p25 = p4Death;
            break;
    }
    switch (s.p3.sprite){
        case 1:
            p31 = p1Left;
            p32 = p1Right;
            p33 = p1Up;
            p34 = p1Down;
            p35 = p1Death;
            break;
        case 2:
            p31 = p2Left;
            p32 = p2Right;
            p33 = p2Up;
            p34 = p2Down;
            p35 = p2Death;
            break;
        case 3:
            p31 = p3Left;
            p32 = p3Right;
            p33 = p3Up;
            p34 = p3Down;
            p35 = p3Death;
            break;
        case 4:
            p31 = p4Left;
            p32 = p4Right;
            p33 = p4Up;
            p34 = p4Down;
            p35 = p4Death;
            break;
    }
    switch (s.p4.sprite){
        case 1:
            p41 = p1Left;
            p42 = p1Right;
            p43 = p1Up;
            p44 = p1Down;
            p45 = p1Death;
            break;
        case 2:
            p41 = p2Left;
            p42 = p2Right;
            p43 = p2Up;
            p44 = p2Down;
            p45 = p2Death;
            break;
        case 3:
            p41 = p3Left;
            p42 = p3Right;
            p43 = p3Up;
            p44 = p3Down;
            p45 = p3Death;
            break;
        case 4:
            p41 = p4Left;
            p42 = p4Right;
            p43 = p4Up;
            p44 = p4Down;
            p45 = p4Death;
            break;
    }
}

function startLoop(){
    console.log('start loop')
    ctx.clearRect(0, 0, 850, 850);
    ctx.drawImage(desertBG, 0, 0, 750, 992, 0, 0, 850, 850);

    //Draw Icons
    s.drawIcons()

    //Draw player borders
    for(let i = 0; i < 4; i++){
        s.drawBorder(s[`p${i+1}`]);
        // s.drawBorder(s.p4)
        
    }
    console.log(gameRunning)
    
    //Draw start button
    ctx.drawImage(startBtn, 0, 0, 380, 170, 270, 550, 300, 130);
    if(gameRunning == false){
        requestAnimationFrame(startLoop);
    }
}

function restartSession(){
    for(let i = 0; i < g.playerArr.length; i++) {
        
        playerScores[`p${i+1}`] = 0;
        
    }
    s = new Startscreen();
    gameRunning = false;
    gameComplete = false;
    stopMainLoop = true;
    document.querySelector('.startbutton').disabled = false;
    startLoop();
    commands();
}

let s;
// startLoop();
// commands();

class Select{
    constructor(){
        this.p1 = {
            exists: true,
            position: 1,
            sprite: 1
        }
        this.twoplayer = false;
        this.threeplayer = false;
        this.fourplayer = false;
    }

    movePosition(player, input){
        
        switch(input){
            case "w": 
                if(player.position == 3){
                    player.position = 2;
                }
                else if(player.position == 2){
                    player.position = 1;
                }
                break;
            case "s":
                if(player.position == 1){
                    player.position = 2;
                }
                else if(player.position == 2){
                    player.position = 3;
                }
                break;
            case "spacebar":
                player.exists = false;
                if(player.position == 1){
                    this.twoplayer = true;
                    s = new Startscreen();
                    startLoop();
                    selectScreen = false;
                    commands();
                }
                if(player.position == 2){
                    this.threeplayer = true;
                    s = new Startscreen();
                    startLoop();
                    selectScreen = false;
                    commands();
                }
                if(player.position == 3){
                    this.fourplayer = true;
                    s = new Startscreen();
                    startLoop();
                    selectScreen = false;
                    commands();
                }
                break;
        }
    }

    drawBorder(player){
        
        if(player.exists == true){
            if(player.position == 1){
                ctx.drawImage(borderBlue, 0, 0, 560, 939, 170, 290, 500, 70);//Top Left
            }
            if(player.position == 2){
                ctx.drawImage(borderBlue, 0, 0, 560, 939, 170, 440, 500, 70);//Top Right
            }
            if(player.position == 3){
                ctx.drawImage(borderBlue, 0, 0, 560, 939, 170, 590, 500, 70);//Bottom Left
            }
        }
    }
}

function selectLoop(){
    // console.log('select loop')
    ctx.clearRect(0, 0, 850, 850);
    ctx.drawImage(desertBG, 0, 0, 750, 992, 0, 0, 850, 850);

    //Minerman Logo
    ctx.drawImage(minerman, 0, 0, 180, 36, 115, 100, 600, 100);

    //Draw Player# options
    ctx.drawImage(players2, 0, 0, 374, 50, 240, 300, 374, 50)
    ctx.drawImage(players3, 0, 0, 374, 50, 240, 450, 374, 50)
    ctx.drawImage(players4, 0, 0, 374, 50, 240, 600, 374, 50)


    //Draw player borders
    sel.drawBorder(sel.p1);
    // console.log(gameRunning)

    // if(gameRunning == false){
    //     requestAnimationFrame(selectLoop);
    // }
}

let sel = new Select();
// selectLoop();
// selectScreen = true;
// commands();

startMovement()