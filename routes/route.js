const express = require('express');
const router = express.Router();
const userCntrl = require('../controllers/authController');
const inventCntrl = require('../controllers/inventoryController');
const analtyicCntrl = require('../controllers/analyticController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminCntrl = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
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
router.get('/inventory/getDonar', authMiddleware,inventCntrl.getDonar)
router.get('/inventory/getHospital', authMiddleware,inventCntrl.getHospital)
router.get('/inventory/getOrg', authMiddleware,inventCntrl.getOrg)
router.get('/inventory/getOrg-forHospital', authMiddleware,inventCntrl.getOrgforHospital)
router.post('/inventory/getInventoryHospital', authMiddleware,inventCntrl.getIventoryHospitalController)
router.get('/inventory/getRecentInventory', authMiddleware,inventCntrl.getRecentInventory)


//analytics api

router.get('/analytics/getBloodDetails', authMiddleware,analtyicCntrl.bloodDetails)

//admin api
router.get('/admin/donarlist', authMiddleware, adminMiddleware,adminCntrl.getDonarList)
router.get('/admin/hospitallist', authMiddleware, adminMiddleware,adminCntrl.getHospitalList)
router.get('/admin/orglist', authMiddleware, adminMiddleware,adminCntrl.getOrgList)
router.delete('/admin/deleteDonar/:id', authMiddleware, adminMiddleware,adminCntrl.deleteDonar)
module.exports = router 