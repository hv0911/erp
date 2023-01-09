const express = require("express");
// const { createCategory, categoryList, categoryUpdateGet, updateCategory, deleteCategory, createBrand, brandList, updateBrandget, updateBrand, deleteBrand, ModelList, updateModelget, updateModel, createUnit, UnitList, updateUnitget, updateUnit, deleteUnit, createVariant, VariantList, updateVariantget, updateVariant, deleteVariant, createSingleProduct, ProductList, singleProduct, deleteSingleProduct, updateSingelProduct } = require("../controllers/productController.js");

// const {createCategory,createProductGet, createServiceGet, createService,createSingleProduct, ServiceList, ProductList } = require("../controllers/productController")
const { createCategory , categoryList ,updateCategory , deleteCategory , categoryUpdateGet ,
        createBrand , brandList , updateBrandget, updateBrand , deleteBrand ,
        createModel , ModelList , updateModelget , updateModel , deleteModel ,
        createUnit , UnitList , updateUnitget , updateUnit , deleteUnit ,
        createSingleProduct , ProductList , updateSingelProduct , getEverything  , deleteSingleProduct
        }                                        =                require("../controllers/productController.js")
const router = express.Router();    


// //   <-- CATEGORIES ROUTES -->

 router.post("/category", createCategory);

router.get("/categories", categoryList);

router.get("/categories/:cateId", categoryUpdateGet);

router.post("/categories/:cateId", updateCategory);

router.delete("/categories/:cateId", deleteCategory);


// // <-- BRAND ROUTES -->

router.post("/brand", createBrand);

router.get("/brands", brandList);

router.get("/brands/:id", updateBrandget);

router.post("/brands/:id", updateBrand);

router.delete("/brands/:id", deleteBrand);


// // <-- MODEL ROUTES -->

router.post("/model", createModel);

router.get("/models", ModelList);

router.get("/models/:id", updateModelget);

router.post("/models/:id", updateModel);

router.delete("/models/:id", deleteModel);



// // <-- UNIT ROUTES -->

router.post("/unit", createUnit);

router.get("/units", UnitList);

router.get("/units/:id", updateUnitget);

router.post("/units/:id", updateUnit);

router.delete("/units/:id", deleteUnit);


// // <-- VARIANT ROUTES -->

// router.post("/variant", createVariant);

// router.get("/variants", VariantList);

// router.get("/variants/:id", updateVariantget);

// router.post("/variants/:id", updateVariant);

// router.delete("/variants/:id", deleteVariant);


// // <-- PRODUCT CONTROLLERS -->

router.get("/product", getEverything)

router.post("/product",createSingleProduct);

router.get("/products",ProductList);

router.post("/products/:id",updateSingelProduct);


// router.get("/products/:id",singleProduct);

router.delete("/products/:id", deleteSingleProduct);



// router.get("/product", createProductGet );

// router.post("/product",createSingleProduct);

// router.get("/products",ProductList);



// router.get("/service", createServiceGet);

// router.post("/service",createService);

// router.get("/services",ServiceList)


module.exports = router;