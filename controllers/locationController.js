const Store = require("../models/LocationModels/Store");
// const Warehouse = require("../models/LocationModels/Warehouse");

exports.createStore = (req, res) => {
  const { name, email, phone, status, address } = req.body;

  const newStore = new Store({
    name: name,
    email: email,
    phone: phone,
    status: status,
    address: address,
  });
  newStore.save();

  return res.status(201).json({
    success: "true",
    store: newStore,
    message:"Store created!"
  });
};


exports.updateStore = async (req, res , next ) => {
  const { name, email, phone, status, address } = req.body;

  const newStore = new Store({
    name: name,
    email: email,
    phone: phone,
    status: status,
    address: address,
    _id:req.params.id
  });
  
    await Store.findByIdAndUpdate(req.params.id , newStore).exec((err)=>{
      if(err){
          return next(err) ;
      }
  })
 

  return res.status(201).json({
    success: "true",
    message:"Store updated!"
  });
};



exports.StoreList = async (req, res) => {
    
  const storeList = await Store.find({}); 
  
  if (!storeList) {
    return res.status(404).json({
      success: true,
      message: "Stores not found",
    });
  }

  return res.status(201).json({
    success: true,
    storeList: storeList,
  });
};


// getting detail of a branch
// exports.store = async (req, res) => {

//   const store = await Branch.findById(req.param.id);

//   if (!branch) {
//     return res.status(201).json({
//       success: true,
//       message: "branch not found"
//     });
//   }

//   return res.status(201).json({
//     success: true,
//     branch: branch,
//   })

// }

// deleting a branch 
// exports.deleteBranch = async (req, res) => {
//   try {

//     await Branch.findByIdAndDelete(req.param.Id);

//     return res.status(201).json({
//       success: true,
//       message: "branch deleted"
//     });


//   } catch (error) {
//     return res.status(201).json({
//       success: false,
//       error,
//     });
//   }


// };



// <--   WAREHOUSE APIs  -->

/*

exports.createWarehouse = (req, res) => {
  const { name, email, phone, status, address } = req.body;

  const newBranch = new Warehouse({
    name: name,
    email: email,
    phone: phone,
    status: status,
    address: address,
  });
  newBranch.save();

  return res.status(201).json({
    success: "true",
    branch: newBranch,
  });
};

exports.WarehouseList = async (req, res) => {
  const warehouseList = await Warehouse.find({});
  if (!warehouseList) {
    return res.status(404).json({
      success: false,
      message: "list not found",
    });
  }

  return res.status(201).json({
    success: true,
    warehouseList: warehouseList,
  });
};


exports.Warehouse = async (req, res) => {

  try {

    const warehouse = await Warehouse.findById(req.params.Id);

    if (!warehouse) {
      return res.status(201).json({
        success: true,
        message: "warehouse"
      })
    }

    return res.status(201).json({
      success: true,
      warehouse: warehouse
    });

  } catch (error) {
    return res.status(501).json({
      success: false,
      error
    })
  }
}


exports.deleteWarehouse = async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.Id);

    return res.status(201).json({
      success: true,
      message: "warehouse deleted"
    })



  } catch (error) {

    return res.status(500).json({
      success: false,
      error
    })
  }
}

*/