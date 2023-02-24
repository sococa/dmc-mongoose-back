const mongoose = require('mongoose')

const DogSitting = mongoose.model('DogSitting', {

    dateStart: {
        type: Date,
        required: true,
        unique: true
    },

    dateEnd: {
        type: Date,
        required: true,
        unique: true
    }

})

module.exports = DogSitting