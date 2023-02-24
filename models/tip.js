const mongoose = require('mongoose')

const Tip = mongoose.model('Tip', {

    title: {
        type: String,
        required: true
    },

    content:{
        type: String,
        required: true
    },

    illustration: {
        type: Object,
    },
    
})

module.exports = Tip