const mongoose = require("mongoose");
const {Schema } = mongoose ;

const stockSchema = new Schema({
    
    product:{
        type:Schema.Types.ObjectId ,
        ref:"SingleProduct"
    } ,
    
    store:{
        type:Schema.Types.ObjectId,
        ref:"Store"
    } ,
    
    quantity:{
        type:Number ,
    } ,
    
    alert_quantity:{
        type:Number ,
    }
    
})

module.exports = mongoose.model( "Stock" , stockSchema )