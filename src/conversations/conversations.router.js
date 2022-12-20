const router = require('express').Router()
const ServicesConversation = require('./conversations.services')
const passportJWT = require('../middlewares/auth.middleware')
const messageServices = require('../messages/message.services')
const participantValidate = require('../middlewares/participantValidate.middleware')


router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.getAllConversation)
    .post(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.getConservationById)
    .patch(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.patchConversation)
    .delete(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.deleteConversation)

//mostrara todos los mensajes de la conversaion
router.route('/:conversation_id/messages')
    .post(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.postMessage)
    .get(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.getAllMessages)
    

router.route('/:conversation_id/messages/:message_id')
    .delete(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.deleteMessageById)


module.exports = router