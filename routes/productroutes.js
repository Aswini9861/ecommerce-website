import express from "express";
import { isAdmin, requireSignin } from "../middleware/authmiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  categoryProduct,
  createproductcontroller,
  deleteproduct,
  getallproducts,
  getproductphoto,
  getsingleproducts,
  productFilter,
  similarProducts,
  updateproduct,
} from "../controller/productcontroller.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createproductcontroller
);

router.get("/products", getallproducts);

router.get("/single-product/:slug", getsingleproducts);

router.get("/product-photo/:pid", getproductphoto);

router.delete("/delete-product/:pid", deleteproduct);

router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateproduct
);

router.post("/filter-product", productFilter);

//similar-products
router.get("/related-products/:pid/:cid", similarProducts);

//get product by category
router.get("/category-product/:slug", categoryProduct);

//token
router.get("/braintree/token", braintreeTokenController);

//payment
router.get("/braintree/payment", braintreePaymentController);

export default router;
