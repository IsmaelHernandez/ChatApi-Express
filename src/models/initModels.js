const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //? FK usersId un usuario tiene muchas messages
    Users.hasMany(Messages)
    //? un message pertenece a un usuario 1- M
    Messages.belongsTo(Users)

    //? un usuario puede tener muchas conversaciones M - M
    Users.hasMany(Conversations)
    //? una conversacion tiene un usuario
    Conversations.belongsTo(Users)

    //? un usuario puede tener muchas participaciones
    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    //? Conversaciones - Messages
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //? convesaciones - participants
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)    
}

module.exports = initModels