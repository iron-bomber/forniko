let socket = io.connect();
console.log('you are now connected to the server')
console.log('socket',socket)

document.onkeypress = function(e){
    if(e.key === "s" || e.key === "S"){
        socket.emit('moveDown', {
            playerID: socket.id
        })
    }
    if(e.key === "w" || e.key === "W"){
        socket.emit('moveUp', {
            playerID: socket.id
        })
    }
    if(e.key === "a" || e.key === "A"){
        socket.emit('moveLeft', {
            playerID: socket.id
        })
    }
    if(e.key === "d" || e.key === "D"){
        socket.emit('moveRight', {
            playerID: socket.id
        })
    }
    // Drop bomb
    if(e.keyCode === 32){
        e.preventDefault();
        socket.emit('dropBomb', {
            playerID: socket.id
        })
    }
}

document.onkeyup = function(e){
    if(e.key === "s" || e.key === "S"){
        socket.emit('moveDownFalse', {
            playerID: socket.id
        })
    }
    if(e.key === "w" || e.key === "W"){
        socket.emit('moveUpFalse', {
            playerID: socket.id
        })
    }
    if(e.key === "a" || e.key === "A"){
        socket.emit('moveLeftFalse', {
            playerID: socket.id
        })
    }
    if(e.key === "d" || e.key === "D"){
        socket.emit('moveRightFalse', {
            playerID: socket.id
        })
    }
}
