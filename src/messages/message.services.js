const messagesControllers = require('../models/messages.models')

const postMessage = (req, res) => {
    const userId = req.user.id
    const conversationId = req.params.conversation_id
    const {message} = req.body
}