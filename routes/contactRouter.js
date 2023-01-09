const express = require("express");


const {
  createContact,
  getCustomers,
  getSuppliers,
  updateContact ,
  updateStatus ,
//   supplier,
//   customer,
//   supplierUpdate,
//   supplierDelete,
//   customerUpdate,
//   customerDelete,
//   getContactPage
} = require("../controllers/contactContollers");

const router = express.Router();

// router.get("/contact", createContactGet);

router.post("/contact", createContact);

router.post("/contacts/:id", updateContact );

router.patch("/contacts/:id", updateStatus ) ;

// router.get('/contact', getContactPage )

//     <-- FOR SUPPLIERS -->

router.get("/suppliers", getSuppliers);

// router.get("/suppliers/:supplierID", supplier); // Not implemented

// router.put("/supplier/:supplierID", supplierUpdate); // Not implemented

// router.delete("/supplier/:supplierID", supplierDelete); // Not implemented




//   <-- FOR CUSTOMERS -->

// router.get("/customer",getCustomer);  


router.get("/customers", getCustomers);

// router.get("/customers/:customerID", customer); //Not implemented

// router.put("/cutomers/:customerID", customerUpdate); // Not implemented

// router.delete("/customer/:customerID", customerDelete); //Not implemented




module.exports = router;
