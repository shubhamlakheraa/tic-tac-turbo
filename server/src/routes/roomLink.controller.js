const roomMapping = {}

function generateRoomID(){
    const roomID = Math.random().toString(36).substring(2, 8)
    const joiningCode = Math.random().toString(36).substring(2, 8)
    return { roomID, joiningCode }
}

function createRoomLink(req, res){

    const { requestingUser } = req.body

    const { roomID, joiningCode } = generateRoomID()
    
    if(!roomMapping[roomID]) {
        roomMapping[roomID] = [requestingUser]
    }
    res.json({roomID, joiningCode})
    

}

module.exports = {
    createRoomLink,
    roomMapping
}