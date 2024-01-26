import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../model/userSchema.js";
dotenv.config();
export const requireSignin = (request, response, next) => {
  try {
    const token = request.headers.authorization;
    const decodetoken = Jwt.verify(token, process.env.SECRET_KEY);
    request.user = decodetoken;
    next();
  } catch (error) {
    console.log(error);
    return response.status(401).send({ message: "invalid request" });
  }
};

export const isAdmin = async (request, response, next) => {
  try {
    const user = await userModel.findById(request.user._id);
    if (user.role !== 1) {
      return response
        .status(401)
        .send({ success: false, message: "unauthorized access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
