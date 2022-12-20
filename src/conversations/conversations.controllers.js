const Conversations = require('../models/conversations.models')
const uuid = require('uuid')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')


//mostrar usuarios y conversaciones - la union gracias a la tabla pivote
const findAllConversation = async () => {
    // anidar joins
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })

    return data
}

const findAllConversationById = async (id) => {
    // anidar joins
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants
        }
    })

    return data
}


// Funcion para crear una conversacion
const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imgUrl: obj.imgUrl,
        userId: obj.ownerId //? creador de las conversacion
    })

    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId,
        conversationId: newConversation.id //?obtenemos el id de la conversacion
    })

    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId,
        conversationId: newConversation.id //?obtenemos el id de la conversacion
    })

    return {
        newConversation,
        participant1,
        participant2
    }
}

const updateConversation = async (id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })

    return data
}

module.exports = {
    findAllConversation,
    createConversation,
    findAllConversationById,
    updateConversation,
    deleteConversation,
}