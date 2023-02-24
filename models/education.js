const mongoose = require('mongoose')

const Education = mongoose.model('Education', {
    
    problemDescription: {
        type: String,
        required: true
    },

    solutions: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    // dogName: {
    //     type: mongoose.Schema.Types.String,
    //     ref: 'Dog'
    // },

    // customerFeedbackId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'CustomerFeedback'
    // }

})

module.exports = Education