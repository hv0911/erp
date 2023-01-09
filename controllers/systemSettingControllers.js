const Country = require("../models/SystemSettingModels/Country.js");
const State = require("../models/SystemSettingModels/State.js");
const City = require("../models/SystemSettingModels/City.js");
const mongoose = require("mongoose");

 // <--  Country APIs  -->
 
exports.createCountry = async (req , res , next) => {
    
    try{
        
         const country = new Country({
             
        country_name:req.body.country_name,
        country_code:req.body.country_code,
        country_phone_code:req.body.country_phone_code, 
    });
    
    country.save((err)=>{
        if(err){
            return next(err);
        }
    })
    
    return res.status(201).json({
        success:true,
        message:"Country added",
        country:country
    })
        
        
    }catch(err){
        return res.status(500).json({
            success:false,
            err
        })
    }
   
}



exports.updateCountry = async (req , res , next) => {
    
    try{
        
         const country = new Country({
             
        country_name:req.body.country_name,
        country_code:req.body.country_code,
        country_phone_code:req.body.country_phone_code, 
        _id:req.params.id
        
    });
    
    await Country.findByIdAndUpdate(req.params.id , country);
    
    return res.status(201).json({
        success:true,
        message:"Country updated",
        country:country
    })
        
        
    }catch(err){
        return res.status(500).json({
            success:false,
            err
        })
    }
   
}


exports.CountryList = async ( req , res , next ) => {
    
    try{
        
         const countryList = await Country.find({}) ;
    
    if(!countryList){
        return res.status(404).json({
            success:false,
            message:"countries not found"
        })
    }
    
    return res.status(201).json({
        success:true,
        countryList:countryList
    })
        
    }catch(err){
         return res.status(500).json({
            success:false,
            err
        })
    }
    
  
}


//        deleting country -- > delete city , state first 

exports.deleteCountry = async (req , res , next ) =>{
    
    await City.deleteMany({country_name:req.params.id}).exec((err)=>{
        if(err){
            return next(err);
        }
    })
    
    await State.deleteMany({country_name:req.params.id}).exec((err)=>{
        if(err){
            return next(err);
        }
    })
    
    await Country.findByIdAndDelete(req.params.id).exec((err)=>{
        if(err){
            return next(err);
        }
    })
    
    return res.status(201).json({
        success:true ,
        messsage:"Country Deleted!"
    })
    
}



 //    <--    State APIs --->
 


exports.createState = async ( req , res , next ) =>{
    
    try{
        
         const state = new State({
        country_name:req.body.country_name,
        state_name:req.body.state_name
    })
    
    state.save((err)=>{
        if(err){
            return next(err);
        }
    })
    
    return res.status(201).json({
        success:true ,
        state:state ,
        message:"state added"
    })
        
    }catch(err){
        
         return res.status(500).json({
            success:false,
            err
        })
        
    }
    
}




exports.updateState = async ( req , res , next ) =>{
    
    try{
        
         const state = new State({
            country:req.body.country,
            state_name:req.body.state_name,
            _id:req.params.id
         })
    
   
   await State.findByIdAndUpdate(req.params.id , state)
    
    return res.status(201).json({
        success:true ,
        message:"State Updated"
    })
        
    }catch(err){
        
         return res.status(500).json({
            success:false,
            err
        })
        
    }
    
}

//  via Country 
exports.StateList = async (req , res , next )=>{
    
    
    
    try{
        
        // const countryId = mongoose.Types.ObjectId(JSON.stringify(req.body.country_name)) ;
        const { country_name } = req.body ;
        const stateList = await State.find( {country_name :  country_name} )
        console.log(stateList);
        
        // if(!stateList){
        //     return res.status(404).json({
        //         success:false,
        //         message:"states not found"
        //     })
        // }
        
        return res.status(201).json({
            success:true ,
            stateList
        })
        
    }catch(err){
      
        return res.status(500).json({
            success:false,
            err
        })
        
        
    }
    
}



//    API for deleting a state --> delete city first 

exports.deleteState = async (req , res , next ) =>{
    
     await City.deleteMany({ state_name : req.params.id  }).exec((err)=>{
         if(err){
             return next(err) ;
         }
     }) 
     
     await State.findByIdAndDelete(req.params.id).exec((err)=>{
         if(err){
             return next(err) ;
         }
     })
     
     return res.status(201).json({
         success:true,
         message:"State Deleted!"
     })
     
    
}


//      <--   APIs for city sections  -->

exports.createCity = async (req , res , next ) =>{
    
    try{
        
        const city = new City({
        country_name:req.body.country_name ,
        state_name:req.body.state_name ,
        city:req.body.city
            })
    
    city.save((err)=>{
        if(err){
         return next(err)
        }
    })
    
    return res.status(201).json({
        success:true ,
        city:city,
        message:"City Added"
    })
    
    
        
    }catch(err){
        return res.status(500).json({
            success:false,
            err
        })
    }
    
}

exports.updateCity = async (req , res , next ) =>{
    
    try{
        
        const city = new City({
        country_name:req.body.country_name ,
        state_name:req.body.state_name ,
        city:req.body.city,
        _id:req.params.id
            })
    
   
   await City.findByIdAndUpdate(req.params.id, city) ;
   
    return res.status(201).json({
        success:true ,
        updatedCity:city,
        message:"City updated!"
    })
    
    
        
    }catch(err){
        return res.status(500).json({
            success:false,
            err
        })
    }
    
}

exports.cityList = async (req ,res , next ) => {
    
    const cityList = await City.find({country_name:req.body.country_name , state_name:req.body.state_name}).select("city") ;
    
    if(!cityList){
        return res.status(404),json({
            success:false ,
            message:"no such city"
        })
    }
    
    return res.status(201).json({
        success:true ,
        cityList:cityList
    })
}

exports.deleteCity = async (req , res , next ) =>{
    
    try{
        
        await City.findByIdAndDelete(req.params.id).exec((err)=>{
            if(err){
                return next(err) ;
            }
        })
        
        return res.status(201).json({
            success:true,
            message:"City Deleted!"
        })
        
    }catch(err){
         return res.status(201).json({
         success:true ,
         cityList:cityList
    })
    }
    
}
