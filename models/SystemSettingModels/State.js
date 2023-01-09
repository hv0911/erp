const mongoose = require("mongoose")

const {Schema} = mongoose;

const stateSchema = new Schema({
    country_name:{
        type:Schema.Types.ObjectId,
        ref:"Country"
    },
    state_name:{
        type:String,
    },

});

module.exports = mongoose.model("State",stateSchema);