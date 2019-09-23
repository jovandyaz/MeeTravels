const mongoose = require('mongoose')
const Schema = mongoose.Schema

const picSchema = new Schema({
    date: String,
    takenBy: {type: Schema.Types.ObjectId, ref:"user"},
    location: {type: Schema.Types.ObjectId, ref:"location"},
    href: String
})
//optional DB schemas for "Region" and "Country"

const Pic = mongoose.model("pic",picSchema)

module.exports = Pic