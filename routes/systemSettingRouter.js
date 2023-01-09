const express = require("express");
const {
    createCountry , CountryList , updateCountry ,
    createState , updateState , StateList , deleteState ,
    createCity , updateCity , deleteCity , cityList , deleteCountry
}                                         =                  require('../controllers/systemSettingControllers.js')

const router = express.Router();

//   Code Here

//   <-- Country Routes -->

router.post("/country",createCountry);

router.get("/countries", CountryList);

router.post("/countries/:id", updateCountry );

router.delete("/countries/:id", deleteCountry ) ;


//   <-- State Routes -->

router.post("/state",createState);

router.post("/states", StateList);

router.post("/states/:id", updateState);

router.delete("/states/:id", deleteState )

//  <-- CIty Routes -->

router.post("/city", createCity)

router.post("/cities" , cityList )

router.post("/cites/:id" , updateCity)

router.delete("/cities/:id",deleteCity)




module.exports = router ;