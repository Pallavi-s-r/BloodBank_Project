const express = require('express');
const router = express.Router();
const userCntrl = require('../controllers/authController');
const inventCntrl = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/api', (req,res)=>{
    res.send("checking")
})

//user api
router.post('/auth/register' , userCntrl.registerUser )
router.post('/auth/login' , userCntrl.login )
router.get('/auth/currentUser', authMiddleware, userCntrl.currentUser)

//inventory api
router.post('/inventory/create-inventory', authMiddleware, inventCntrl.addInventory)
router.get('/inventory/bloodRecords', authMiddleware,inventCntrl.bloodRecord)

module.exports = router 