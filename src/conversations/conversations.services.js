const ConversationControllers = require('./conversations.controllers')

const getAllConversation = (req, res) => {
    ConversationControllers.findAllConversation()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const postConversation = (req, res) => {
    const {title, imgUrl, participantId} = req.body
    const ownerId = req.user.id //token decodificado
    ConversationControllers.createConversation({title, imgUrl, participantId, ownerId})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const getConservationById = (req, res) =>{
    const id = req.params.conversation_id
    ConversationControllers.findAllConversationById(id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            }else{
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const patchConversation = (req, res) => {
    const id = req.params.conversation_id
    const {title, imageUrl} = req.body
    ConversationControllers.updateConversation({title, imageUrl})
        .then(data => {
            if(data){
                res.status(200).json(data)
            }else{
                res.status(404).json({message: `Conversation with ID: ${id} Updated Succesfully`})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const deleteConversation = (req, res) => {
    const id = req.params.conversation_id
    ConversationControllers.deleteConversation(id)
        .then(data => {
            if(data){
               res.status(204).json({message: 'Conversation Elimined'}) //204 sin contenido
            }else{
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}



module.exports = {
    getAllConversation,
    postConversation,
    getConservationById,
    patchConversation,
    deleteConversation,
}