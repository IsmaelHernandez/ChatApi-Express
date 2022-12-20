const Messages = require('../models/messages.models')
const Conversations = require('../models/conversations.models')
const uuid = require('uuid')



const findAllMessages = async () => {
    const data = await Messages.findAll({
        include: {
            model: Conversations,   
        }
    })

    return data
}

const findMessageById = async (id) => {
    const data = await Messages.findOne({
        where: {
            id: id
        },
        include : {
            model: Conversations
        }
    })
}

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })

    return data
}

const deleteMessage = async (id) => {
    const data = await Messages.destroy({
        where: {
            id: id
        }
    })
    return data
}


module.exports = {
    createMessage,
    findAllMessages,
    findMessageById,
    deleteMessage,
}
 