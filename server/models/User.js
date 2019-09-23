
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    username: String,
    password: String,
    location: {type:Schema.Types.ObjectId,ref:"location"},
    trips: [{type:Schema.Types.ObjectId,ref:"trip"}]
})

const User = mongoose.model("user",userSchema)

module.exports = User