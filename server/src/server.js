const http = require("http")

const app = require("./app")

const { Server } = require("socket.io")

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173"
    }
})




io.on('connection', (socket) => {
    console.log(`A user connected at ${socket.id}`)


    socket.on('disconnect', () => {
        console.log('Auser disconnected')
    })
})
 
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})