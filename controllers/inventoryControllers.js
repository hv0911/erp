const OpeningStock = require('../models/InventoryModels/OpeningStock.js');
const Stock = require("../models/InventoryModels/Stock.js");
const StockTransfer = require("../models/InventoryModels/StockTransfer.js");


 //     <-- OpenintStock Controllers -->
                  
exports.createOpeningStock = async (req , res , next ) => {
    
    
    try{
        
        
       let stock = await Stock.findOne({ product:req.body.product , store:req.body.store })
       
       if(!stock){
           
           stock = new Stock({
               
               product:req.body.product ,
               store:req.body.store ,
               quantity:req.body.stat_quantity ,
               alert_quantity:req.body.alert_quantity ,
               
           })
           
           await stock.save((err) => {
               if(err){
                   return next(err) ;
               }
           })
           
       }else{
           
           stock.quantity += req.body.stat_quantity ;
           
           stock.alert_quantity = req.body.alert_quantity ;
           
           await stock.save((err)=>{
               if(err){
                   return next(err) ;
               }
           })
           
       }
        
        const openingStock = new OpeningStock({
            
            product:req.body.product ,
            
            date:req.body.date ,
            
            store:req.body.store ,
            
            purchase_price:req.body.purchase_price ,
            
            selling_price:req.body.selling_price ,
            
            unit:req.body.unit ,
            
            quantity:req.body.quantity ,
            
            // role:req.body.role ,     maybe later
        }) ;
        
        await openingStock.save((err)=>{
            if(err){
                return next(err) ;
            }
        })
        
        return res.status(201).json({
            success:true ,
            message:"Stock Added!",
            openingStock:openingStock
        })
        
    }catch(err){
        return res.status(500).json({
            success:false,
            err
        })
    }
    
    
}





exports.OpeningStockList = async ( req , res , next ) => {
    
    try{
        
        const openingStockList = await OpeningStock.find({}).populate([
        {
            path:"product" ,
            model:"SingleProduct" ,
            select:"product_name product_sku" ,
            populate:[{
                path:"category" ,
                model:"Category" ,
                select:"name"
            } ,
          {
                path:"brand" ,
                model:"Brand" ,
                 select:"name"
            } ,
          {
                path:"unit" ,
                model:"Unit" ,
                 select:"name"
            } ,
          {
                path:"model" ,
                model:"Model" ,
                 select:"name"
            } ,
            
            ]
           
            
        }   , 
        {
            path:"store",
            model:"Store",
            select:"name"
        }
        ]);
        
        
        if(!openingStockList){
            return res.status(404).json({
                success:false ,
                message:"No stock added"
            })
        }
        
        return res.status(201).json({
            success:true ,
            openingStockList:openingStockList ,
        })
        
    }catch(err){
        return res.status(500).json({
            success:false ,
            err
        })
    }
    
}

   //    <-- Getting a stockList/dynamic -->
exports.StockList = async (req , res , next ) => {
    
    const stockList = await Stock.find({}).populate([
            
             {
            path:"product" ,
            model:"SingleProduct" ,
            select:"product_name product_sku" ,
            populate:[{
                path:"category" ,
                model:"Category" ,
                select:"name"
            } ,
          {
                path:"brand" ,
                model:"Brand" ,
                 select:"name"
            } ,
          {
                path:"unit" ,
                model:"Unit" ,
                 select:"name"
            } ,
          {
                path:"model" ,
                model:"Model" ,
                 select:"name"
            } ,
            
            ]
           
            
        }   , 
        {
            path:"store",
            model:"Store",
            select:"name"
        }
       
        ]) ;
        
        
        if(!stockList){
            return res.status(404).json({
                success:false ,
                message:"no stock avilable"
            })
        }
        
        return res.status(201).json({
            success:true ,
            stockList:stockList 
        })
    
}



exports.createStockTransfer = async (req , res , next ) => {
    
    try{
        const stockTransfer = new StockTransfer({
            to_store:req.body.to_store ,
            from_store:req.body.from_store ,
            date:req.body.date ,
            product:req.body.product ,
            trans_quantity:req.body.trans_quantity ,
        })
        
        await stockTransfer.save((err) => {
            return next(err) ;
        }) ;
        
        return res.status(201).json({
            success:true ,
            message:'transfer request added'
        })
        
        
        
    }catch(err){
        
        return res.status(201).json({
            success:false ,
            err
        })
        
    }
    
}


