let tempUp = false;
let tempRight = false;
let tempLeft = false;
let tempDown = false;
let tempPressed = "down";
let tempBomb = false;
function startMovement() {
        // console.log('sending movement to server')
        let movementInterval = setInterval(()=>{
            // console.log('movement sending')
            let data = {
                playerID: socket.id,
                up: tempUp,
                left: tempLeft,
                down: tempDown,
                right: tempRight,
                bomb: tempBomb,
                tempPressed: tempPressed,
            }
            socket.emit('movement', (data))
            tempBomb = false;
        },1000/60)
}


let socket = io.connect();
console.log('you are now connected to the server')
console.log('socket',socket)

document.onkeypress = function(e){
    if(e.key === "s" || e.key === "S"){
        tempDown = true;
    }
    if(e.key === "w" || e.key === "W"){
        tempUp = true;
    }
    if(e.key === "a" || e.key === "A"){
        tempLeft = true;
    }
    if(e.key === "d" || e.key === "D"){
        tempRight = true;
    }
    // Drop bomb
    if(e.keyCode === 32){
        e.preventDefault();
        tempBomb = true;
    }
}

document.onkeyup = function(e){
    if(e.key === "s" || e.key === "S"){
        tempDown = false;
        tempPressed = "down"
    }
    if(e.key === "w" || e.key === "W"){
        tempUp = false;
        tempPressed = "up"
    }
    if(e.key === "a" || e.key === "A"){
        tempLeft = false;
        tempPressed = "left"
    }
    if(e.key === "d" || e.key === "D"){
        tempRight = false;
        tempPressed = "right"
    }
}
