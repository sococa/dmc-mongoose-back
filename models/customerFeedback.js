const mongoose = require('mongoose')

const CustomerFeedback = mongoose.model('CustomerFeedback', {

    comment: {
        type: String, 
        required: true
    },

    note: {
        type: Number,
        min:0,
        max: 5,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

})

module.exports = CustomerFeedback