import { comparePassword, hashPassword } from "../helper/bcrypt.js";
import userModel from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import orderModel from "../model/orderModel.js";
dotenv.config();

export const registercontroller = async (request, response) => {
  try {
    const { name, email, password, phone, address, answer } = request.body;
    if (!name) {
      return response.send("name is required");
    }
    if (!email) {
      return response.send("email is required");
    }
    if (!password) {
      return response.send("password is required");
    }

    if (!phone) {
      return response.send("phone is required");
    }

    if (!address) {
      return response.send("address is required");
    }
    if (!answer) {
      return response.send("answer is required");
    }
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return response.status(400).send({ message: "email already registered" });
    }
    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    return response.status(201).send({
      success: true,
      message: "user registered successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "something went wrong",
      error,
    });
  }
};

// login

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .send({ message: "invalid email or password" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(400).send({ message: "Email is not registered" });
    }

    if (user) {
      const comparedpassword = await comparePassword(
        request.body.password,
        user.password
      );

      if (!comparedpassword) {
        return response
          .status(200)
          .send({ success: false, message: "invalid email or password !" });
      }
      const token = await jwt.sign(
        {
          _id: user._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
      return response.status(200).send({
        success: true,
        message: "Login Successfully",
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ success: false, message: "something went wrong!", error });
  }
};

//password reset controller
export const resetpasswordcontrolleer = async (request, response) => {
  try {
    const { email, answer, newpassword } = request.body;
    if (!email) {
      return response.status(400).send({ message: "email is required" });
    }

    if (!answer) {
      return response.status(400).send({ message: "answer is required" });
    }
    if (!newpassword) {
      return response.status(400).send({ message: "newpassword is required" });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return response.status(404).send({ message: "user is not register" });
    }
    const resethashedPassword = await hashPassword(newpassword);

    await userModel.findByIdAndUpdate(user._id, {
      password: resethashedPassword,
    });
    return response
      .status(200)
      .send({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return response.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controlller

export const testController = async (request, response) => {
  try {
    response.send("protected routes");
  } catch (error) {
    console.log(error);
    return response
      .status(401)
      .send({ message: "you can not access you are not authorized" });
  }
};

// update profile controller
export const updateProfileController = async (request, response) => {
  try {
    const { name, email, password, phone, address } = request.body;
    //const user = await userModel.findOne({ email });

    const user = await userModel.findById(request.user._id);
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updateProfile = await userModel.findByIdAndUpdate(
      request.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.hashedPassword,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    return response.status(200).send({
      success: true,
      message: "Profile update successfully",
      updateProfile,
    });
  } catch (error) {
    return response.status(500).send({
      message: "something went wrong while updating product",
      error,
    });
  }
};

//order controller
export const getOrderController = async (request, response) => {
  try {
    const order = await orderModel
      .find({ buyer: request.user._id })
      .populate("products", "-photo")
      .populate('buyer','name');
  } catch (error) {
    return response.status(500).send({
      message: "something went wrong while getting order products",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

