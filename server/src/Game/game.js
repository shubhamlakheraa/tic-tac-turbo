function newGame(room, userId, username) {
    let isRoomExist = gameDetail.find(item => item.room === room)
    if(!isRoomExist){
        let newGameDetail = []
        newGameDetail = {room, user1:{userId, username, moves: [], winCount:0, inGame: false}, user2:{userId:0, username:0, moves: [], winCount:0, inGame:false}}

        gameDetail.push(newGameDetail)
    }
    else{
        if(isRoomExist.user2.userId === 0 && isRoomExist.user1.userId != userId){
            isRoomExist.user2.userId = userId
            isRoomExist.user2.username = username
        }
        else{
            // console.log("Same user cannot add two times or 2 players are already in the room");
            return false;
        }
    }

    return false
}

function getGameDetail(room) {
    return gameDetail.find(item => item.room === room)
}


function addMove(room, userId, move){
    let gameDetail = getGameDetail(room)
    if(gameDetail.users[0] == socket.id){

    }
    gameDetail.moves.push(move)
}

const winPatterns = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

function CheckWin(room, userId) {

    let gameDetail = getGameDetail(room)

    let user
    let curr_user_moves
    let winCount
    if(gameDetail.user1.userId == userId){
        user = 1
        curr_user_moves = gameDetail.user1.moves
    }
    else{
        user = 2
        curr_user_moves = gameDetail.user2.moves
    }

    let pattern 
    let isWin
    for(let i=0; i<winPatterns.length; i++){
        let win_pattern = winPatterns[i]
        isWin = true
        for(let j=0; j<win_pattern.length; j++){
            if(!curr_user_moves.includes(win_pattern[j])){
                isWin = false
            }
        }

        if(isWin){
            pattern = i 
            if(user === 1){
                gameDetail.user1.winCount = gameDetail.user1.winCount + 1
                winCount = gameDetail.user1.winCount
            }

            else{
                gameDetail.user2.winCount = gameDetail.user2.winCount + 1
                winCount = gameDetail.user1.winCount
            }
            break
        }

    }

    return {isWin, winCount, pattern}

}


