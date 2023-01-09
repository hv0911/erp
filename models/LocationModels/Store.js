const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Active", "DeActive"],
    required: true,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Store", storeSchema);
