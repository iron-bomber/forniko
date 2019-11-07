let host = false;
let playerOneDead = false;
let playerTwoDead = false;
let playerOneX;
let playerOneY;
let playerTwoX;
let playerTwoY;
let numOfPlayers;
let playersLeft;
let playerScores = {p1: 0, p2: 0, p3: 0, p4: 0};
let gameReset = false;
// SPRITE VARS
let lastPressed = 'down';
let lastPressed2 = 'ArrowDown';
const ctx = document.getElementById('main-game-board').getContext('2d');
// ctx.imageSmoothingEnabled = false;

let bombIDs = 0;

//Player one

const p1Left = new Image();
const p1Right = new Image();
const p1Up = new Image();
const p1Down = new Image();
const p1Death = new Image();


const spriteHeight1 = 50;
p1Left.src ="./Images/p1/p1WalkLeft.png";
p1Right.src="./Images/p1/p1WalkRight.png";
p1Up.src="./Images/p1/p1WalkUp.png";
p1Down.src="./Images/p1/p1WalkDown.png";
p1Death.src="./Images/p1/p1Death.png";



//Player two

const spriteHeight2 = 53;
const p2Left = new Image();
const p2Right = new Image();
const p2Up = new Image();
const p2Down = new Image();
const p2Death = new Image();


p2Death.src="./Images/p2/p2Death.png";
p2Left.src ="./Images/p2/p2WalkLeft.png";
p2Right.src="./Images/p2/p2WalkRight.png";
p2Up.src="./Images/p2/p2WalkUp.png";
p2Down.src="./Images/p2/p2WalkDown.png";

//p3
const p3Left = new Image();
const p3Right = new Image();
const p3Up = new Image();
const p3Down = new Image();
const p3Death = new Image();

p3Death.src="./Images/p3/p3Death.png";
p3Left.src ="./Images/p3/p3WalkLeft.png";
p3Right.src="./Images/p3/p3WalkRight.png";
p3Up.src="./Images/p3/p3WalkUp.png";
p3Down.src="./Images/p3/p3WalkDown.png";

//p4
const p4Left = new Image();
const p4Right = new Image();
const p4Up = new Image();
const p4Down = new Image();
const p4Death = new Image();

p4Death.src="./Images/p4/p4Death.png";
p4Left.src ="./Images/p4/p4WalkLeft.png";
p4Right.src="./Images/p4/p4WalkRight.png";
p4Up.src="./Images/p4/p4WalkUp.png";
p4Down.src="./Images/p4/p4WalkDown.png";