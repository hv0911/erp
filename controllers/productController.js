const Brand = require("../models/ProductModel/Brand"); 
const { findById } = require("../models/ProductModel/Category"); 
const Category = require("../models/ProductModel/Category"); 
const Model = require('../models/ProductModel/Model'); 
const Combo = require("../models/ProductModel/Combo");
const Service = require("../models/ProductModel/Service");
const SingleProduct = require("../models/ProductModel/SingleProduct");
const Unit = require("../models/ProductModel/Unit"); 
const Variant = require("../models/ProductModel/Variant"); 
const multer = require("multer");
const multerParse = multer();
const path = require("path");


/* Using multer for image upload */

let imgUrl = 'http://addas.co.in:4600/product/' ;

const fileStorage = multer.diskStorage({
    destination:"images/product",
    filename:(req,file,cb)=>{
        cb(null , file.fieldname + '_' + Date.now() + path.extname(file.originalname)) ;
    }
});

const uploadImage = multer({
    storage:fileStorage,
    limits:{
        fileSize:1000000
    },
    // fileFilter(req , file , cb){
    //     // if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
    //     //     return cb(new Error('Please upload an image!'));
    //     // }
    //     cb(undefined,true)
    // }
})





//   <- CATEGORY APIS -->

exports.createCategory =  async(req, res) => {

    try {
        const { name, code, status, parent , description } = req.body;

        const category = new Category({

            name: name,
            code: code,
            status: status,
            parent: parent,
            description:description,
        });
        category.save();

        return res.status(201).json({
            success: true,
            category: category,
            status:201,
            message:"Category created!"

        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
}

exports.categoryList = async (req, res) => {
    try {
        const categories = await Category.find({});

        if (!categories) {
            return res.status(404).json({
                success: false,
                message: "category not found"
            });
        }

        return res.status(201).json({
            success: true,
            categories: categories
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}


// for getting a particular category
exports.categoryUpdateGet = async (req, res) => {


    try {
        const category = await Category.findById(req.params.cateId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "category not found"
            });
        }

        return res.status(201).json({
            success: true,
            category: category
        })

    } catch (error) {
        return res.status(500).json({
            success: true,
            error
        })
    }
}


exports.updateCategory = async (req, res, next) => {

    const { name, code, status, parent , description } = req.body;
    console.log(req.params.id);

    const category = new Category({

        name: name,
        code: code,
        status: status,
        parent: parent,
        description:description,
        _id: req.params.cateId,
    });

    await Category.findByIdAndUpdate(req.params.cateId, category);

    return res.status(201).json({
        success: true,
        category: category
    })

}


exports.deleteCategory = async (req, res) => {

    try {
        await Category.findByIdAndRemove(req.params.cateId);

        return res.status(201).json({
            success: true,
            message: "category deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


//    <-- BRAND API -->

exports.createBrand = (req, res) => {

    try {

        const { name, description, status } = req.body;

        const brand = new Brand({
            name: name,
            description: description,
            status: status,
        });

        brand.save();

        return res.status(201).json({
            success: true,
            brand: brand,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


exports.brandList = async (req, res) => {
    try {

        const brandList = await Brand.find({});

        if (!brandList) {
            return res.status(404).json({
                success: false,
                message: "brands not found"
            });
        }

        return res.status(201).json({
            success: true,
            brandList: brandList
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


exports.updateBrandget = async (req, res) => {

    try {

        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "brand not found"
            })
        }

        return res.status(201).json({
            success: true,
            brand: brand
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}

exports.updateBrand = async (req, res) => {

    try {

        const { name, description, status } = req.body;

        const brand = new Brand({
            name: name,
            description: description,
            status: status,
            _id: req.params.id
        });

        await Brand.findByIdAndUpdate(req.params.id, brand);

        return res.status(201).json({
            success: true,
            brand: brand,
            message:"Brand Updated"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error
        })

    }

}


exports.deleteBrand = async (req, res) => {

    try {
        await Brand.findByIdAndRemove(req.params.id);

        return res.status(201).json({
            success: true,
            message: "Brand Deleted"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}


//   <-- Model API -->


exports.createModel = (req, res) => {

    try {

        const { name, description, status } = req.body;

        const model = new Model({
            name: name,
            description: description,
            status: status,
        });

        model.save();

        return res.status(201).json({
            success: true,
            model: model,
            message:"Model created!"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


exports.ModelList = async (req, res) => {
    try {

        const modelList = await Model.find({});

        if (!modelList) {
            return res.status(404).json({
                success: false,
                message: "models not found"
            });
        }

        return res.status(201).json({
            success: true,
            modelList: modelList
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


exports.updateModelget = async (req, res) => {

    try {

        const model = await Model.findById(req.params.id);

        if (!model) {
            return res.status(404).json({
                success: false,
                message: "model not found"
            })
        }

        return res.status(201).json({
            success: true,
            model: model,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}



exports.updateModel = async (req, res) => {

    try {

        const { name, description, status } = req.body;

        const model = new Model({
            name: name,
            description: description,
            status: status,
            _id: req.params.id
        });

        await Model.findByIdAndUpdate(req.params.id, model);

        return res.status(201).json({
            success: true,
            model: model,
            message:"Model Updated"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error
        })

    }

}


exports.deleteModel = async (req, res) => {

    try {
        await Model.findByIdAndDelete(req.params.id);

        return res.status(201).json({
            success: true,
            message: "Model deleted"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}



//   <-- Unit APIs -->

exports.createUnit = (req, res) => {

    try {

        const { name, description, status } = req.body;

        const unit = new Unit({
            name: name,
            description: description,
            status: status,
        });

        unit.save();

        return res.status(201).json({
            success: true,
            unit: unit,
            message:"Unit Created"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


exports.UnitList = async (req, res) => {
    try {

        const unitList = await Unit.find({});

        if (!unitList) {
            return res.status(404).json({
                success: false,
                message: "units not found"
            });
        }

        return res.status(201).json({
            success: true,
            unitList: unitList
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


exports.updateUnitget = async (req, res) => {

    try {

        const unit = await Unit.findById(req.params.id);

        if (!unit) {
            return res.status(404).json({
                success: false,
                message: "model not found"
            })
        }

        return res.status(201).json({
            success: true,
            unit: unit
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


exports.updateUnit = async (req, res) => {

    try {

        const { name, description, status } = req.body;

        const unit = new Unit({
            name: name,
            description: description,
            status: status,
            _id: req.params.id
        });

        await Unit.findByIdAndUpdate(req.params.id, unit);

        return res.status(201).json({
            success: true,
            unit: unit,
            message:"Unit Updated"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error
        })

    }

}


exports.deleteUnit = async (req, res) => {

    try {
        await Unit.findByIdAndDelete(req.params.id);

        return res.status(201).json({
            success: true,
            message: "Unit deleted"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}



//  <-- VARIANT APIs -->

/*

exports.createVariant = (req, res) => {

    try {

        const { name, description, status } = req.body;

        const variant = new Variant({
            name: name,
            description: description,
            status: status,
        });

        variant.save();

        return res.status(201).json({
            success: true,
            variant: variant,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


exports.VariantList = async (req, res) => {
    try {

        const variantList = await Variant.find({});

        if (!variantList) {
            return res.status(404).json({
                success: false,
                message: "variant not found"
            });
        }

        return res.status(201).json({
            success: true,
            variantList: variantList
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}


exports.updateVariantget = async (req, res) => {

    try {

        const variant = await Variant.findById(req.params.id);

        if (!variant) {
            return res.status(404).json({
                success: false,
                message: "model not found"
            })
        }

        return res.status(201).json({
            success: true,
            variant: variant
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}

exports.updateVariant = async (req, res) => {

    try {

        const { name, description, status } = req.body;

        const unit = new Variant({
            name: name,
            description: description,
            status: status,
            _id: req.params.id
        });

        await Variant.findByIdAndUpdate(req.params.id, model);

        return res.status(201).json({
            success: true,
            unit: unit
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error
        })

    }

}


exports.deleteVariant = async (req, res) => {

    try {
        await Variant.findByIdAndDelete(req.params.id);

        return res.status(201).json({
            success: true,
            message: "variant deleted"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

*/

//  <-- PRODUCT CONTROLLERS -->







// fetching a partiular product
exports.singleProduct = async(req , res)=>{
 try {
    
    const product = await singleProduct.findById(req.params.Id);
    
    if(!product){
        return res.status(404).json({
            success:false,
            messsage:"product does not exists"
        })
    }

    return res.status(201).json({
        success:true,
        product:product,
    })

 } catch (error) {
    
    return res.status(500).json({
        success:false,
        error
    })

 }

}




// updating a product 

// exports.updateSingelProduct = async(req  , res , next)=>{

//     try {
        
//         const product = new singleProduct({

//             product_name:req.body.product_name,
        
//             product_sku:req.body.product_sku,
        
//             unit:req.body.unit,
        
//             baracode_type:req.body.baracode_type,
        
//             brand:req.body.brand,
        
//             category:req.body.category,
        
//             subCategory:req.body.subCategory,
        
//             model:req.body.model,
        
//             alter_qauntity:req.body.alter_qauntity,
        
//             purchase_price:req.body.purchase_price,
        
//             selling_price:req.body.selling_price,

//             tax:req.body.tax,
        
//             tax_type:req.body.tax_type,
        
//             description:req.body.description,

//             _id:req.params.Id

//         });

//         await singleProduct.findByIdAndUpdate(req.params.Id , product ,(err)=>{
//             if(err){
//                 return next(err);
//             }
//         });

//         return res.status(201).json({
//             success:true,
//             updateProduct:product
//         });

        

//     } catch (error) {
        
//         return res.status(5000).json({
//             success:false,
//             error
//         })
//     }
// }



//   <--  Service Controllers -->




// fetching a particular service
exports.Service = async(req ,res )=>{

try {
    
const service = await Service.findById(req.params.Id);

if(!service){
    return res.status(404).json({
        success:false,
        message:"service does not exists"
    })
}

return res.status(201).json({
    success:true,
    service:service
});

} catch (error) {
   
    return res.status(500).json({
        success:false,
        message:"true"
    })
}

}

// updating service

exports.updateService = async(req,res)=>{

  try {

    const {product_name , sku , hourly_rate , description } = req.body;

    const service = await Service({
        product_name:product_name,
        sku:sku,
        hourly_rate:hourly_rate,
        description:description,

    });

    await Service.findByIdAndUpdate(req.params.Id , service , (err)=>{
        if(err){
            next(err);
        }
    })

    return res.status(201).json({
        success:true,
        updatedService: service
    });
    
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"true"
    })
  }

}


//       <--  ComboProduct -->  

exports.createCombo = async(req , res)=>{


    try {
        
        const combo = new Combo({

            product_name:req.body.product_name,

            barcode_type:req.body.barcode_type,

            select_product:req.body.select_product,

            purchase_price:req.body.purchase_price,

            min_selling_price:req.body.min_selling_price,

            combo_selling_price:req.body.combo_selling_price,

            description:req.body.description,

        });

        await combo.save();

        return res.status(201).json({
            success:true,
            combo:combo,
        });


    } catch (error) {
        
        return res.status(201).json({
            success:false,
            error
        })

    }

}


exports.ComboList = async(req , res )=>{
    
    try {
        
        const comboList = await Combo.find({});
        
        if(!comboList){
            return res.status(201).json({
                success:false,
               message:"no combo Products"
            })
        }

        return res.status(201).json({
            success:true,
            comboList : comboList,
        });



    } catch (error) {
        
        return res.status(500).json({
            success:false,
            error
        })
    }

}

// fetching a specific combo product
exports.Combo = async(req,res)=>{
    try {
       const combo = await Combo.findById(req.params.Id).populate("product") ;
       
       if(!combo){
        return res.status(404).json({
            success:false,
            message:"comboProduct not found"
        })
       }

       return res.status(201).json({

        success:true,
         combo:combo,

       })

    } catch (error) {
        
        return res.status(201).json({
            success:false,
            error
        })

    }
}

// deleting a combo product
exports.deleteCombo = async(req , res)=>{

    try {
        
        await Combo.findByIdAndDelete(req.params.Id);

        return res.status(201).json({
            success:true,
            message:"product deleted"
        });


    } catch (error) {
        
        return res.status(500).json({
            success:false,
            error
        })

    }

}


// edit remaining 





exports.updateCombo = (req,res)=>{
    res.send("NOT IMPLIMENTED");
}








//    Main Product  Controllers 

// exports.createProductGet = ( req , res , next )=>{

//     res.render("pages/product");

// }

// exports.createServiceGet = ( req , res , next  )=>{
    
//     res.render("pages/service")

// }


//  <-- Product APIS -->



//  < --  getting everything -->

exports.getEverything = async (req , res , next ) =>{
    
    try{
        
    const categories = await Category.find({status:"Active"}).select("name")
    const brands = await Brand.find({status:"Active"}).select("name")
    const models = await Model.find({status:"Active"}).select("name")
    const units = await Unit.find({status:"Active"}).select("name")
    
    return res.status(201).json({
        success:true ,
        categories:categories ,
        brands:brands,
        units:units,
        models:models
    })
        
        
    }catch(err){
        return res.status(500).json({
            success:false ,
            err
        })
    }
    
   
    
    
    
}



exports.createSingleProduct    = [ uploadImage.single("product_img") , async (req , res, next )=>{
    
    
           const product = new SingleProduct();
           
          if(req.file !== undefined ){
              product.product_img = imgUrl + req.file.filename ;
          }       
          
            product.product_name = req.body.product_name,
        
            product.product_sku = req.body.product_sku,
        
            product.unit = req.body.unit,
        
            // baracode_type:req.body.baracode_type,
        
            product.brand = req.body.brand,
        
            product.category = req.body.category,
        
            product.subCategory = req.body.subCategory,
        
            product.model = req.body.model,
        
            // alert_qauntity:req.body.alert_qauntity,  
            
            // product_img: imgUrl + req.file.filename  ,
        
            product.purchase_price = req.body.purchase_price,
        
            product.selling_price = req.body.selling_price,

            product.min_selling_price = req.body.min_selling_price,

            // tax:req.body.tax,
        
            // tax_type:req.body.tax_type,
        
            product.description = req.body.description,
         
            
        //   await   product.save((err)=>{
        //       return next(err);
        //   });
           
        //   return res.status(201).json({
        //       success:true ,
        //       product:product,
        //       message:"Product Added"
        //   })
            
        
        

    
    await product.save((err)=>{
        return next(err);
    })
    
    return res.status(201).json({
        success:true,
        product:product
    })
    
    }

]





 exports.ProductList = async(req , res )=>{

        try {
            
            const productList = await SingleProduct.find({}).populate("category",["name"]).populate("brand",["name"]).populate("model",["name"]).populate("unit",["name"]);;
    
            if(!productList){
              return res.status(404).json({
                success:false,
                message:"products not found"
                }
              )
            }
    
            return res.status(201).json({  
               success:true,
               productList:productList,
               
            });
    
    
        } catch (error) {
            
            return res.status(500).json({
                success:false,
                error
            })
    
        }
    
    }




exports.updateSingelProduct = [ uploadImage.single("product_img") , async (req , res , next )=>{
    
      const product = new SingleProduct();
           
          if(req.file !== undefined ){
              product.product_img = imgUrl + req.file.filename ;
          }       
          
            product.product_name = req.body.product_name,
        
            product.product_sku = req.body.product_sku,
        
            product.unit = req.body.unit,
        
            // baracode_type:req.body.baracode_type,
        
            product.brand = req.body.brand,
        
            product.category = req.body.category,
        
            product.subCategory = req.body.subCategory,
        
            product.model = req.body.model,
        
            // alert_qauntity:req.body.alert_qauntity,  
            
            // product_img: imgUrl + req.file.filename  ,
        
            product.purchase_price = req.body.purchase_price,
        
            product.selling_price = req.body.selling_price,

            product.min_selling_price = req.body.min_selling_price,

            // tax:req.body.tax,
        
            // tax_type:req.body.tax_type,
        
            product.description = req.body.description,
            
            product._id = req.body.id
    
        await SingleProduct.findByIdAndUpdate( req.body.id , product )
        
        return res.status(201).json({
            success:true,
            product:product,
            message:"Product Updated"
        })
    
}
    ]


const fs = require("fs");
exports.deleteSingleProduct = async( req , res , next ) => {

  try {
      
      const product =  await SingleProduct.findById(req.params.id).select("product_img") 
      let productImg = product.product_img 
      
      if(productImg){
           productImg = productImg.substring(imgUrl.length) ;
           fs.unlink(`./images/product/${productImg}`, (err)=>{
               if(err){
                   return next(err);
               }
               console.log('deleted successfully!')
      }) };
                
    await SingleProduct.findByIdAndDelete(req.params.id);

    return res.status(201).json({
        success:true,
        messsage:"Product Deleted!",
        productImg
    })

   } catch (error) {
    
    return res.status(500).json({
        success:false,
        error
    })

  }
  

}

// exports.viewProduct = async(req , res ) => { res.send("NOT IMPLEMENTED") } // after inventory



exports.createService = async(req , res )=>{
    try {
        
        const {product_name , sku , hourly_rate , description } = req.body;
    
        const service = await Service({
            product_name:product_name,
            sku:sku,
            hourly_rate:hourly_rate,
            description:description,
    
        });

        await service.save((err)=>{
            if(err){
                return next(err);
            }
        });
    
        return res.redirect("/services");
    
    } catch (error) {
        
        return res.status(500).json({
    
            success:false,
            error
        })
    
    }
    }

 // change 
   

 // change
    exports.ServiceList = async(req , res)=>{

        try {
            const serviceList = await Service.find({});
    
            if(!serviceList){
                return res.status(404).render(
                    "pages/services",{
                    success:false,
                    serviceList:""
                });
            }
    
            return res.status(201).render(
                "pages/services",
                {
                success:true,
                serviceList:serviceList
            });
    
        } catch (error) {
            
            return res.status(201).json({
                success:false,
                error
            })
    
        }
    }
    