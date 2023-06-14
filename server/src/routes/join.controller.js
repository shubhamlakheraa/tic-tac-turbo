const { roomMapping } = require('./roomLink.controller')


function addPlayer(req, res){
    const { roomid } = req.params
    const { username } = req.body

   

    if (roomMapping[roomid]){
        if(roomMapping[roomid].length === 2){
            res.status(400).json({message: 'Room is full.'})
        }
        else{
            roomMapping[roomid].push(username)
            
            console.log(roomMapping)
            
            res.sendStatus(200)
            
        }
        
    }
    else{
        res.sendStatus(404)
    }
    

    
}

module.exports = {
    addPlayer,
}