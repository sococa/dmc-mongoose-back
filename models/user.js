const mongoose = require('mongoose')
const validator = require('validator');

const User = mongoose.model('User', {
    
    firstName : {
        type: String,
        required: true
    },

    lastName : {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        // validate(v) { 
        //     if(!validator.isEmail(v)) {
        //         throw new Error("Le format de l'email est invalide") 
        //     }
        // }
    },

    phone: {
        type: String,
        required: true
        // validate(v) {
        //     if(!validator.isMobilePhone(v)) {
        //         throw new Error("Le format du numéro de téléphone est invalide") 
        //     }
        // }
    },

    // token: {
    //     type: String
    // },

    // salt: {
    //     type: String
    // },

    // hash: {
    //     type: String
    // },

    creation_timestamp: {
        type: Date
    }

})

module.exports = User