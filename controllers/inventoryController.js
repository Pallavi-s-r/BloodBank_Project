const inventoryModel = require('../models/inventoryModel')
const userModel = require('../models/userModel');

const addInventory  = async(req,res) =>{
    try{
        const {email, inventoryType} = req.body
        const user = await userModel.findOne({email})
        if(!user){
           throw new Error('user not found'); 
        }
        if(inventoryType === 'in' && user.role !== 'donar'){
           throw new Error('not a donor account');
        }
        if(inventoryType === 'out' && user.role !== 'hospital'){
           throw new Error('not a hospital account');
        }

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

module.exports = {addInventory, bloodRecord}