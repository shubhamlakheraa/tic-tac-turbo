const express = require("express")

const { createRoomLink }  = require("./roomLink.controller")

const roomLinkRouter = express.Router()
roomLinkRouter.post('/api/generate-code', createRoomLink)

module.exports = roomLinkRouter