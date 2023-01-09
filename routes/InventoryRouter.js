const express = require("express");

const { createOpeningStock , OpeningStockList , StockList ,
        createStockTransfer}                =        require("../controllers/inventoryControllers.js") ;

const router = express.Router();

 /* Code HERE */
 
 router.post("/openingStock", createOpeningStock ) ;
 
 router.get("/openingStockList" , OpeningStockList ) ;
 
 router.get("/stockList" , StockList ) ;
 
 router.post("/transfer", createStockTransfer)
 
 
 
 
 module.exports = router ;