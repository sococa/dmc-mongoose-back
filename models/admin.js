const mongoose = require('mongoose')

const Admin = mongoose.model('Admin', {

    email : {
        type: String,
        required: true
    },
    token: String,
    salt: String,
    hash: String
    
})

module.exports = Admin