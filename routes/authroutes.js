import express from 'express'
import { getOrderController, loginController, orderStatusController, registercontroller, resetpasswordcontrolleer, testController, updateProfileController } from '../controller/authcontroller.js'
import { isAdmin, requireSignin } from '../middleware/authmiddleware.js'

const router = express.Router()

//register controller
router.post('/register',registercontroller)

//login controller
router.post('/login',loginController)

//password reset
router.post('/resetpassword',resetpasswordcontrolleer)

//testing middleware

router.post('/test',requireSignin,isAdmin,testController)


// user protecting routes
router.get('/protected-routes',requireSignin,(request,response)=>{
    response.status(200).send({ok:true})
})


// admin protecting routes
router.get('/admin-protected-routes',requireSignin,isAdmin,(request,response)=>{
    response.status(200).send({ok:true})
})

//update profile
router.put('/update-profile',requireSignin,updateProfileController)

//updates
router.get('/orders',requireSignin,getOrderController)

// order status update
router.put(
    "/order-status/:orderId",
    requireSignin,
    isAdmin,
    orderStatusController
  );

export default router