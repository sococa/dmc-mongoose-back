const mongoose = require('mongoose')

const Dog = mongoose.model('Dog', {

    name: {
        type: String
    },
    
    photo: {
        type: Object,
        default: 'dogProfile.jpg'
    },

    race: {
        type: String,
    },

    // isEducated: {
    //     type: Boolean
    // },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = Dog
