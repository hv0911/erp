const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  contact_type: {
    type: String, // <-- hold-->
    enum: ["Supplier", "Customer"],
    required: true,
  },

  // contactID: {
  //   type: String,
  //   unique: true,
  // },

  name: {
    type: String,
    required: true,
  },
  
  contact_img:{
    type:String ,
  },

 
  business_name: String,

  tax_number: String,

  // opening_balance: Number,

  // pay_term: String,

  // pay_term_condition: String,

  email: {
    type: String,
    required: true,
    unique: [true, "Email already Exist"],
  },

  mobile_no: Number,

  alt_mobile_no: Number,

//   password: {
//     type: String,
//     required: true,
//   },

  country: {
     type:Schema.Types.ObjectId ,
     ref:"Country"
  },

  state: {
      type:Schema.Types.ObjectId,
      ref:"State"
  },

  city: {
      type:Schema.Types.ObjectId,
      ref:"City"
  },

  address: String,

  note: String,
  
  status:{
      type:String ,
      enum:["Active", "DeActive"] ,
      default:"Active"
  }
  
});

module.exports = mongoose.model("Contact", contactSchema);
