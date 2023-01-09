const express = require("express");
// const {
// //   branchList,
// //   createBranch,
// //   createWarehouse,
// //   WarehouseList,
// //   branch,
// //   deleteBranch,
// //   Warehouse,
// //   deleteWarehouse,
// } = require("../controllers/locationController");

const { createStore , StoreList , updateStore }   =  require("../controllers/locationController")

const router = express.Router();

router.post("/store",createStore) ;

router.get("/stores", StoreList) ;

router.post("/stores/:id" , updateStore ) ;

/*

 //   <-- BRANCH ROUTES -->

router.post("/branch", createBranch);

router.get("/branches", branchList);

router.get("/branches/:Id" , branch);

router.delete("/branches/:Id",deleteBranch);


 //   <-- WAREHOUSE ROUTES -->

router.post("/wareHouse", createWarehouse);

router.get("/wareHouses", WarehouseList);

router.get("/wareHouses/:Id" , Warehouse);

router.delete("/wareHouse/:Id" , deleteWarehouse);

*/
module.exports = router;
