import express from 'express'
import { createcategorycontroller, deletecategorycontroller, getcategorycontroller, getsinglecategorycontroller, updatecategorycontroller } from '../controller/categorycontroller.js'
import { isAdmin, requireSignin } from '../middleware/authmiddleware.js'

const router = express.Router()

// create category
router.post('/create-category',requireSignin,isAdmin,createcategorycontroller)

// update category

router.put('/update-category/:id',requireSignin,isAdmin,updatecategorycontroller)


//get category
router.get('/category',getcategorycontroller)


//get category
router.get('/single-category/:slug',getsinglecategorycontroller)



//delete category
router.delete('/delete-category/:id',requireSignin,isAdmin,deletecategorycontroller)


export default router