//ALL PLAYER KEYSTROKES SENT TO SERVER ON SET INTERVAL
let tempUp = false;
let tempRight = false;
let tempLeft = false;
let tempDown = false;
let tempPressed = "down";
let tempBomb = false;
function startMovement() {
        console.log('sending movement to server')
        setInterval(()=>{
            // console.log('movement sending')
            let data = {
                playerID: socket.id,
                up: tempUp,
                left: tempLeft,
                down: tempDown,
                right: tempRight,
                bomb: tempBomb,
                tempPressed: tempPressed,
                host: host,
            }
            socket.emit('movement', (data))
            tempBomb = false;
        },1000/60)
}


let socket = io.connect();
console.log('you are now connected to the server')
console.log('socket',socket)


function controls() {
    if(gameRunning) {
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
                on = true;
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
    } else if (selectScreen) {
        if (host) {
            //Sending select character controls to server
            document.onkeypress = function(e){
                if(e.key === "s" || e.key === "S"){
                    socket.emit('select',
                    {
                        key: 's'
                    });
                }
                if(e.key === "w" || e.key === "W"){
                    socket.emit('select',
                    {
                        key: 'w'
                    });
                }
                if(e.key === "a" || e.key === "A"){
                    socket.emit('select',
                    {
                        key: 'a'
                    });
                }
                if(e.key === "d" || e.key === "D"){
                    socket.emit('select',
                    {
                        key: 'd'
                    });
                }
                if(e.keyCode === 32) {
                    socket.emit('select',
                    {
                        key: 'spacebar',
                    });
                }
            }
        }

    } else if (startScreen) {
        //Sending select character controls to server
        document.onkeypress = function(e){
            if(e.key === "s" || e.key === "S"){
                socket.emit('start',
                {
                    key: 's',
                    socketID: socket.id
                });
            }
            if(e.key === "w" || e.key === "W"){
                socket.emit('start',
                {
                    key: 'w',
                    socketID: socket.id
                });
            }
            if(e.key === "a" || e.key === "A"){
                socket.emit('start',
                {
                    key: 'a',
                    socketID: socket.id
                });
            }
            if(e.key === "d" || e.key === "D"){
                socket.emit('start',
                {
                    key: 'd',
                    socketID: socket.id
                });
            }
            if(e.keyCode === 32) {
                socket.emit('start',
                {
                    key: 'spacebar',
                    socketID: socket.id
                });
            }
        }
    }
}

// Receives select character information from server

