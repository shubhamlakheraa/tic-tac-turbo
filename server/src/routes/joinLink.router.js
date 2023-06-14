const express = require('express')

const { addPlayer } = require('./join.controller')

const joinLinkRouter = express.Router()

joinLinkRouter.post('/api/room/:roomid/join', addPlayer )

module.exports = joinLinkRouter