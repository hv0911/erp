const mongoose = require("mongoose");

const { Schema } = mongoose;

const citySchema = new Schema({
    country_name: {
        type: Schema.Types.ObjectId,
        ref: "Country",
        required:true
    },
    state_name:{
        type: Schema.Types.ObjectId,
        ref:"State" ,
        required:true
    },
    city:{
        type:String ,
        required:true
    }
})

module.exports = mongoose.model("City",citySchema);