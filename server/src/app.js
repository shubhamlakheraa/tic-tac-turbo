const express = require("express")
const cors = require("cors")
const { Server } = require('socket.io')
const roomLinkRouter = require("./routes/roomLink.router")
const joinLinkRouter = require('./routes/joinLink.router')
const app = express()



app.use(cors({
    origin: 'https://tic-tac-turbo.vercel.app',
}))

app.use(express.json())
app.use(roomLinkRouter)
app.use(joinLinkRouter)

module.exports = app
