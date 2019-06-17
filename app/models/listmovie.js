const mongoose = require('mongoose')
// const validator = require('validator')
const { Schema } = mongoose
const listmovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: String,
         required:true
    },
    director: {
        type: String,
         required:true
    },
    description: {
        type: String,
         required:true
    },
    image: [
        {
            type: String,
            //required: true
        }
    ],
    genere: {
        type: Schema.Types.ObjectId,
        ref:'Genere'
    }
   
    
})
const ListMovie = mongoose.model('ListMovie', listmovieSchema)

module.exports = {
    ListMovie
}