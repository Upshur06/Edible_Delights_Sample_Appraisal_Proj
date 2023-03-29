const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EdibleSchema = new Schema({
    name : String,
    price : String,
    discription : String,
    category : String
});

module.exports = mongoose.model('EdibleDelights', EdibleSchema);