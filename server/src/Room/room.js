function addRoom(room){
    let roomExist = game.find(item => item.room === room)
    if(!roomExist) {
        game.push({
            room, 
            users: [],
            moves: {}
        })
    }
}

function removeRoom(room){
    let index = gameDetail.findIndex(item => item.room === room)
    if(index !== -1){
        return gameDetail.splice(index, 1)[0]
    }
}