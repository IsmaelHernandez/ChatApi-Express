const router = require('express').Router()
const messageServices = require('./message.services')
const passportJWT = require('../middlewares/auth.middleware')


router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), messageServices.getAllMessages)
    .delete(passportJWT.authenticate('jwt', {session: false}), messageServices.deleteMessageById)


module.exports = router