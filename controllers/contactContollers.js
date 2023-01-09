const Contact = require("../models/ContactModels/Contact");
const multer = require("multer");
const path = require("path")


/* Using multer for image upload */

let imgUrl = 'http://addas.co.in:4600/contact/' ;

const fileStorage = multer.diskStorage({
    destination:"images/contact",
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






// exports.getContactPage = (req, res, next) => {

//   res.render("pages/contact")

// }


exports.createContact =[ uploadImage.single("contact_img") , async (req, res, next) => {
 

  const newContact = new Contact() ;
  
   if(req.file !== undefined ){
              newContact.contact_img = imgUrl + req.file.filename ;
          }   
  
  

    newContact.contact_type  =  req.body.contact_type,

    newContact.name  =  req.body.name,

    // profile_picture: req.body.profile_picture,

    newContact.business_name  =  req.body.business_name,

    newContact.tax_number  =  req.body.tax_number,

    // opening_balance: req.body.opening_balance,

    // pay_term: req.body.pay_term,

    // pay_term_condition: req.body.pay_term_condition,

    newContact.email  =  req.body.email,

    newContact.mobile_no  =  req.body.mobile_no,

    newContact.alt_mobile_no  =  req.body.alt_mobile_no,

    //  password: req.body.password,

    newContact.country  =  req.body.country,

   newContact. state  =  req.body.state,

    newContact.city  =  req.body.city,

    newContact.address  =  req.body.address,  
    
    newContact.note =  req.body.note,

//   });

  newContact.save((err) => {
    if (err) {
      return next(err)
    }
  });

  // return res.send("form submitted");
 



     return res.status(201).json({ 
       success: true,
       message:"Contact Created!",
       contact: newContact,
     });
     
     
     
     
     
}  ];






exports.updateContact =[ uploadImage.single("contact_img") , async (req, res, next) => {
 

  const newContact = new Contact() ;
  
   if(req.file !== undefined ){
              newContact.contact_img = imgUrl + req.file.filename ;
          }   
  
  

    newContact.contact_type  =  req.body.contact_type,

    newContact.name  =  req.body.name,

    // profile_picture: req.body.profile_picture,

    newContact.business_name  =  req.body.business_name,

    newContact.tax_number  =  req.body.tax_number,

    // opening_balance: req.body.opening_balance,

    // pay_term: req.body.pay_term,

    // pay_term_condition: req.body.pay_term_condition,

    newContact.email  =  req.body.email,

    newContact.mobile_no  =  req.body.mobile_no,

    newContact.alt_mobile_no  =  req.body.alt_mobile_no,

    //  password: req.body.password,

    newContact.country  =  req.body.country,

   newContact. state  =  req.body.state,

    newContact.city  =  req.body.city,

    newContact.address  =  req.body.address,  
    
    newContact.note =  req.body.note,
    
    newContact._id  = req.params.id

//   });

   await Contact.findByIdAndUpdate(req.params.id , newContact ).exec((err)=>{
       if(err){
           return next(err) ;
       }
   });

  // return res.send("form submitted");
 



     return res.status(201).json({ 
       success: true,
       message:"Contact Updated!",
       contact: newContact,
     });
     
     
     
     
     
}  ];


exports.updateStatus = async (req , res , next ) =>{
    
    try{
        
        let contact = await Contact.findById(req.params.id) 
        
        contact.status = req.body.status ;
        
        await contact.save((err)=>{
            if(err){
                return next(err) ;
            }
        })
        
        return res.status(201).json({
            success:true ,
             message:"status updated!"
        })
        
        
    }catch(err){
        
        return res.status(500).json({
            success:false ,
            err
        })
        
    }
    
}







// exports.createContactGet = (req, res) => {
//   res.send("GET conatact request");
// };

//    <-- SUPPLIERS -->

exports.getSuppliers = async (req, res , next ) => {
  try {
    let suppliers = await Contact.find({ contact_type: "Supplier" } , 'name email mobile_no tax_number status')

    if (!suppliers) {
     return res.status(404).json({
         success:false,
         message:"no Suppliers"
     })
    }

    return res.status(201).json(
      {
          success:true ,
          suppliers:suppliers
      }
      );
      
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error occur",
    });
  }
};



exports.supplier = (req, res) => {
  res.send(`GET request for a specific supplier - id${req.params.supplierID}`);
};

exports.supplierUpdate = (req, res) => {
  res.send(`PUT request for a specific supplier - id${req.params.supplierID}`);
};

exports.supplierDelete = (req, res) => {
  res.send(
    `Delete request for a specific supplier - id${req.params.supplierID}`
  );
};

//  <-- CUSTOMERs -->

exports.getCustomers = async (req, res) => {
  try {
    let customers = await Contact.find({ contact_type: "Customer" }, 'name email mobile_no tax_number status');

    if (!customers) {
      return res.status(404).json({
        success: false,
        message: "customers not exists",
      });
    }

    return res.status(201).json({
        success:true ,
        customers:customers
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error occur",
    });
  }
};

exports.customer = (req, res) => {
  res.send(`GET request for a specific customer - id${req.params.customerID}`);
};

exports.customerUpdate = (req, res) => {
  res.send(`PUT request for a specific supplier - id${req.params.customerID}`);
};

exports.customerDelete = (req, res) => {
  res.send(
    `Delete request for a specific supplier - id${req.params.customerID}`
  );
};
