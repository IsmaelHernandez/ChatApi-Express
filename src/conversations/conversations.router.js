const router = require('express').Router()
const ServicesConversation = require('./conversations.services')
const passportJWT = require('../middlewares/auth.middleware')
const { Router } = require('express')


router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.getAllConversation)
    .post(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.getConservationById)
    .patch(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.patchConversation)
    .delete(passportJWT.authenticate('jwt', {session: false}), ServicesConversation.deleteConversation)

module.exports = router