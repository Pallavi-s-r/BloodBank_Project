const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel.js');


//register
const registerUser = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'USer already registered'
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hasedPassword //replacing normal pss with hashpass

        //accessing rest data and saving it
        
        const user = new userModel(req.body);
console.log(user)

        await user.save()
        return res.status(200).send({
            success: true,
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error
        })
    }
}

//login

const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
//check role for login as well
if(user.role !== req.body.role){
    return res.status(500).send({
        success: false,
        message:"role does not match"
    })
}
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: 'Password mismatch or incorrect'
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        return res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login API',
            error
        })
    }
}

//current user
// const currentUser = async (req,res) =>{
//     try{
// const user = await userModel.findOne({_id:req.body.userId}).populate("donar").populate("hospital").sort({createdAt: -1});
// return res.status(200).send({
//     success: true,
//     message:"user fetched successfully",
//     user
// })
//     }catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: 'unable to get current user',
//             error
//         })
//     }
// }

// const currentUser = async (req, res) => {
//     try {
//         const { userId, role } = req.body;

//         let user;

//         if (role === "admin") {
//             // Logic to fetch admin information
//             user = await userModel.findOne({ _id: userId, role: "admin" });
//         } else if (role === "organisation") {
//             // Logic to fetch organisation information
//             user = await userModel.findOne({ _id: userId, role: "organisation" });
//         } else if (role === "hospital") {
//             // Logic to fetch hospital information
//             user = await userModel.findOne({ _id: userId, role: "hospital" });
//         } else if (role === "donar") {
//             // Logic to fetch donar information
//             user = await userModel.findOne({ _id: userId, role: "donar" });
//         } else {
//             return res.status(400).send({
//                 success: false,
//                 message: "Invalid role"
//             });
//         }

//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         return res.status(200).send({
//             success: true,
//             message: "User fetched successfully",
//             user
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: 'Unable to get current user',
//             error: error.message
//         });
//     }
// }

const currentUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};



module.exports = { registerUser, login, currentUser}