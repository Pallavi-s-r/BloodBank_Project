const  mongoose = require('mongoose');
const inventoryModel = require('../models/inventoryModel')
const userModel = require('../models/userModel');

const addInventory  = async(req,res) =>{
    try{
        const {email} = req.body
        const user = await userModel.findOne({email})
        if(!user){
           throw new Error(`user not  ${email} found`); 
        }
        console.log('Email:', email);
console.log('User:', user);

        // if(inventoryType === 'in' && user.role !== 'donar'){
        //    throw new Error('not a donor account');
        // }
        // if(inventoryType === 'out' && user.role !== 'hospital'){
        //    throw new Error('not a hospital account');
        // }

       if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

        //save record
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        return res.status(200).send({
            success: true,
            message: 'new blood recorded',
            inventory

        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in create Inventory  API',
            error
        })
    }
}

const bloodRecord = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({organisation: req.body.userId}).populate("donar").populate("hospital").sort({createdAt: -1});
        
        return res.status(200).send({
            success: true,
            message: 'All inventory details fetched successfully',
            inventory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching inventory details',
            error
        });
    }
}


//get donar record

const getDonar = async (req, res) => {
 try{
const organisation = req.body.userId;
//find donar
const donarId = await inventoryModel.distinct("donar", {
  organisation
});
// console.log(donarId)

const donars = await userModel.find({_id:{$in:donarId}})
return res.status(200).send({
  success: true,
  message: "Donar record fetched succesfully",
  donars
})
 }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching donar details',
            error
        });
    }
}

const getHospital = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    //FIND HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};


//get org for donars

const getOrg = async (req, res) => {
  try{
    //if donar then only will display org page
    const donar = req.body.userId
    const orgId = await inventoryModel.distinct('organisation', {donar})
    
    //find org
    const organisations = await userModel.find({_id:{$in:orgId}})
    return res.status(200).send({
      success: true,
      message: "Organisation Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Org API",
      error,
    });
  }
}


const getOrgforHospital = async (req, res) => {
  try {
    const hospitalId = req.body.userId;

    // Check if the logged-in user is a hospital
    const hospital = await userModel.findOne({ _id: hospitalId, role: 'hospital' });

    if (!hospital) {
      return res.status(400).send({
        success: false,
        message: 'User is not a hospital',
      });
    }

    // Find organizations
    const organisations = await userModel.find({ role: 'organisation' });
console.log(organisations)
    return res.status(200).send({
      success: true,
      message: 'Organizations Data Fetched Successfully',
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error In get Org API',
      error,
    });
  }
}

//get hospital blood record

const getIventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find(req.body.filters).populate("donar").populate("hospital").populate('organisation').sort({createdAt: -1});
        
        return res.status(200).send({
            success: true,
            message: 'All inventory blood consumer fetched successfully',
            inventory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching consumer details',
            error
        });
    }
}

//get blood records of 3 (analyitc pg)

const getRecentInventory  = async(req,res) =>{
  try{
const inventory = await inventoryModel.findOne({
  organisation: req.body.userId
}).limit(3).sort({createdAt: -1})

return res.status(200).send({
  success:true,
  message: 'recent inventory data',
  inventory
})
  }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching in recent inventory details',
            error
        });
    }
}
module.exports = {addInventory, bloodRecord , getDonar , getHospital, getOrg, getOrgforHospital , getIventoryHospitalController , getRecentInventory} 