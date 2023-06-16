const http = require("http")
const app = require("./app")

const { Server } = require("socket.io")

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://tic-tac-turbo.vercel.app"
    }
})

const {
    userJoin,
    getGameDetail,
    addUser,
    userLeft,
    newGame,
    CheckWin,
    removeRoom
} = require('./users')

let rooms = []




io.on('connection', (socket) => {
    console.log(`A user connected at ${socket.id}`)


    socket.on('joinRoom', (payload) => {

        addUser(socket.id, payload.roomId)

        const user = {socketId: socket.id, username: payload.username, roomId: payload.roomId}

        newGame(payload.roomId, payload.userId, payload.username)

        socket.join(user.roomId)
        socket.emit('message', "Welcome to the room")

        const current_room = getGameDetail(user.roomId)

    })

    socket.on('joinExistingRoom', (payload) => {
        addUser(socket.id, payload.roomId)

        const user = {socketId: socket.id, username: payload.username, roomId: payload.roomId }
        const roomExists = getGameDetail(payload.roomId)

        if(!roomExists){
            socket.emit('message', {error: 'Room does not exist'})
        }

        if(!newGame(payload.roomId, payload.userId, payload.username)){
            socket.emit('message', {error: 'Room is full'})
        }

        socket.join(user.roomId)
        socket.emit('message', 'Welcome to the room ')

        socket.to(payload.roomId).emit('userJoined', `${payload.username} has joined the room`)

        return
    })

    socket.on('usersEntered', (payload) => {
        console.log("userEntered Called")
        const current_game = getGameDetail(payload.roomId)

        if(!current_game){
            return
        }

        if(current_game.user1.userId === payload.userId){
            current_game.user1.inGame = true
        }
        else if(current_game.user2.userId === payload.userId){
            current_game.user2.inGame = true
        }

        if(current_game.user1.inGame && current_game.user2.inGame){
            io.in(payload.roomId).emit('usersEntered', {user1: current_game.user1, user2: current_game.user2})
        }

    })

    socket.on('move', async (payload) => {
        
        const current_room = await getGameDetail(payload.roomId)
        let current_username
        let moveCount

        if(!current_room.user1.userId || !current_room.user2.userId){
            io.in(payload.roomId).emit('userleave', {})
            console.log("user left")
        }

        if(current_room.user1.userId == payload.userId){
            current_room.user1.moves.push(payload.move)
            moveCount = current_room.user1.moves.length
            current_username = current_room.user1.username
        }

        else{
            current_room.user2.moves.push(payload.move)
            moveCount = current_room.user2.moves.length
            current_username = current_room.user2.username
        }

        io.in(payload.roomId).emit('move', {move: payload.move, userId: payload.userId})

        if(moveCount >= 3){
            const {isWin, winCount, pattern} = CheckWin(payload.roomId, payload.userId)

            if(isWin){
                io.in(payload.roomId).emit('win', {userId: payload.userId, username: current_username, pattern})
                return
            }
            if(current_room.user1.moves.length + current_room.user2.moves.length >= 9){
                io.in(payload.roomId).emit('dra', {roomId: payload.roomId})
                return 
            }
        }

    })

    socket.on('reMatch', (payload) => {
        let currGameDetail = getGameDetail(payload.roomId)

        currGameDetail.user1.moves = []
        currGameDetail.user2.moves = []

        io.in(payload.roomId).emit('reMatch', {currGameDetail})
    })

    socket.on('removeRoom', (payload) => {
        io.in(payload.roomId).emit('removeRoom', ('remove'))
        removeRoom(payload.roomId)
    })


    socket.on('disconnect', () => {
        const roomId = userLeft(socket.id)
        io.in(roomId).emit('userLeave', {roomId})
        console.log('Auser disconnected')
    })
})
 
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})