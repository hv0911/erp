const mongoose = require("mongoose");

const { Schema } = mongoose ;

const ProductTransfer = new Schema({
    
   to_store:{
       type:Schema.Types.ObjectId ,
       ref:"Store"
   } ,
   from_store:{
       type:Schema.Types.ObjectId ,
       ref:"Store"
   } ,
   date:{
       type:Date ,
       default:Date.now() ,
   } ,
   product:{
       type:Schema.Types.ObjectId ,
       ref:"SingleProduct"
   } ,
   trans_quantity:{
       type:Schema.Types.ObjectId ,
   } ,
   status:{
       type:String ,
       enum:["pending" , "approved"],
       default:"pending"
   }
    
}) ;

module.exports = mongoose.model("StockTransfer", ProductTransfer )
