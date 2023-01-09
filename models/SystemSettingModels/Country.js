const mongoose = require('mongoose');

const {Schema} = mongoose ;

const countrySchema = new Schema({
    country_name:{
        type:String,
        required:"true"
    },
    country_code:String,
    country_phone_code:Number,
});

module.exports = mongoose.model("Country",countrySchema);