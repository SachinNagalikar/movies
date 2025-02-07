const mongoose = require('mongoose')
const { Schema } = mongoose
const genereSchema = new Schema({
    genere: {
        type: String,
        required: true
    },
  
    createdAt: {
        type: Date,
        default: Date.now
    },
})
const Genere = mongoose.model('Genere', genereSchema)

module.exports = {
    Genere
}