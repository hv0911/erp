const mongoose = require("mongoose");

const {Schema } = mongoose ;

const openingStockSchema = new Schema({
    
    product:{
        type:Schema.Types.ObjectId ,
        ref:"SingleProduct",
        required:true
    } ,
    date:{
        type:Date,
        default:Date.now(),
        required:true
    },
    store:{
        type:Schema.Types.ObjectId,
        ref:"Store"
    },
    purchase_price:{
        type:Number
    },
    selling_price:{
        type:Number
    },
    stat_quantity:{
        type:Number
    } ,
    alert_quantity:{
        type:Number
    } ,
    // unit:{
    //     type:Schema.Types.ObjectId,
    //     ref:"Unit"
    // },
    role:{
        type:String ,
        default:"Super Admin"
    }
    
    
});

module.exports = mongoose.model("OpeningStock", openingStockSchema );