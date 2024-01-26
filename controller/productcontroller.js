import productmodel from "../model/productmodel.js";
import fs, { createReadStream } from "fs";
import slugify from "slugify";
import categoryModel from "../model/categoryModel.js";
import braintree from "braintree";
import orderModel from "../model/orderModel.js";
import dotenv from 'dotenv'
dotenv.config()

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createproductcontroller = async (request, response) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      request.fields;
    const { photo } = request.files;
    switch (true) {
      case !name:
        return response.send("name is required");
      case !description:
        return response.send("description is required");

      case !price:
        return response.send("price is required");
      case !category:
        return response.send("category is required");
      case !quantity:
        return response.send("quantity is required");

      case photo && photo.size > 1000000:
        return response
          .status(500)
          .send({ error: "Photo is required and should be less then 1mb" });
    }

    const products = new productmodel({
      ...request.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    response.status(200).send({
      success: true,
      message: "product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    response
      .status(400)
      .send({ message: "something went wrong in creating product", error });
  }
};

// get all products
export const getallproducts = async (request, response) => {
  try {
    const products = await productmodel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    return response.status(200).send({
      success: true,
      proeductLength: products.length,
      message: "your all products details",
      products,
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send({ message: "something went wrong while get the products", error });
  }
};

// get single products
export const getsingleproducts = async (request, response) => {
  try {
    const products = await productmodel
      .findOne({ slug: request.params.slug })
      .select("-photo")
      .populate("category");
    response.status(200).send({
      success: true,
      message: "SingleProduct fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error in getting single data",
      error: error.message,
    });
  }
};

//get photos
export const getproductphoto = async (request, response) => {
  try {
    const productPhoto = await productmodel
      .findById(request.params.pid)
      .select("photo");

    if (productPhoto.photo.data) {
      response.set("content-type", productPhoto.photo.contentType);
      return response.status(200).send(productPhoto.photo.data);
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "something went wrong while get the product photo",
      error,
    });
  }
};

// delete products

export const deleteproduct = async (request, response) => {
  try {
    const { pid } = request.params;
    const products = await productmodel.findByIdAndDelete(pid).select("-photo");

    return response.status(200).send({
      success: true,
      message: "product deleted successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "something went wrong while delete product",
      error,
    });
  }
};

// update products

export const updateproduct = async (request, response) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      request.fields;
    const { photo } = request.files;

    switch (true) {
      case !name:
        return response.send({ error: "name is required" });
      case !description:
        return response.send({ error: "description is required" });

      case !price:
        return response.send({ error: "price is required" });
      case !category:
        return response.send({ error: "category is required" });
      case !quantity:
        return response.send({ error: "quantity is required" });

      case photo && photo.size > 1000000:
        return response
          .status(500)
          .send({ error: "Photo is required and should be less then 1mb" });
    }

    const products = await productmodel.findByIdAndUpdate(
      request.params.pid,
      {
        ...request.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = createReadStream(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    response.status(201).send({
      success: true,
      message: "product updated successfully",
      products,
    });
  } catch (error) {
    response
      .status(400)
      .send({ message: "something went wrong while updating product", error });
  }
};

// filter product

export const productFilter = async (request, response) => {
  try {
    const { checked, radio } = request.body;

    let query = {};
    if (checked.length > 0) query.category = checked;

    if (radio.length) query.price = { $gte: radio[0], $lte: radio[1] };

    const product = await productmodel.find(query);
    return response.status(200).send({
      success: true,
      message: "product filtered successfully",
      product,
    });
  } catch (error) {
    return response.status(500).send({
      message: "something went wrong while filter product",
      error,
    });
  }
};

export const similarProducts = async (request, response) => {
  try {
    const { pid, cid } = request.params;
    const products = await productmodel
      .find({ category: cid, _id: { $ne: pid } })
      .select("-photo")
      .limit(3)
      .populate("category");
    return response.status(200).send({
      success: true,
      message: "Filter Similar Product Successfully",
      products,
    });
  } catch (error) {
    return response.status(500).send({
      message: "something went wrong while geting similar product",
      error,
    });
  }
};

export const categoryProduct = async (request, response) => {
  try {
    const category = await categoryModel.findOne({ slug: request.params.slug });
    const products = await productmodel.find({ category }).populate("category");

    return response.status(200).send({
      message: "get category wise product successfully",

      products,
    });
  } catch (error) {
    return response.status(500).send({
      message: "Something went wrong while getting category wise product",
      error,
    });
  }
};

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const braintreePaymentController = async (req, res) => {
  try {
    const [cart, nonce] = req.body;
    let total;
    cart.map((i) => {
      total += i.price;
    });
    let newTransation = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true
      }
    },
    function (error,result) {
      if(result){
        const order = new orderModel({
          products:cart,
          payment:result,
          buyer:req.user._id
        }).save()
        res.json({ok:true})
      }
      else{
        res.status(500).send(error)
      }


    }
    )
  } catch (error) {
console.log(error)
  }

};
