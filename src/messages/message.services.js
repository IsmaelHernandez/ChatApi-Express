const messagesControllers = require('./message.controllers')

const getAllMessages = (req, res) => {
    messagesControllers.findAllMessages()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const deleteMessageById = (req, res) => {
    const id = req.params.message_id
    messagesControllers.deleteMessage(id)
        .then(data => {
            if(data) {
                res.status(204).json({message: "Message Elimined"})
            }else{
                res.status(404).json({message: "Invalid ID"})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}


const postMessage = (req, res) => {
    const userId = req.user.id
    const conversationId = req.params.conversation_id 
    const { message } = req.body

    messagesControllers.createMessage({ userId, conversationId, message })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })

}

module.exports = {
    postMessage,
    getAllMessages,
    deleteMessageById,
}