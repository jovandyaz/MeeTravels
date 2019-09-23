const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
    start: String,
    end: String,
    pics: [{type: Schema.Types.ObjectId, ref:"pic"}],
    user: {type: Schema.Types.ObjectId, ref:"user"},    
    locations: [{type: Schema.Types.ObjectId, ref:"location"}]
})

const Trip = mongoose.model("trip",tripSchema)

module.exports = Trip