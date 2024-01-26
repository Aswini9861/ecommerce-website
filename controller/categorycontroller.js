import categoryModel from "../model/categoryModel.js";
import slugify from "slugify";

export const createcategorycontroller = async (request, response) => {
  try {
    const { name } = request.body;
    if (!name) {
      return response.send("name is required");
    }
    const existingslugname = await categoryModel.findOne({ name });
    if (existingslugname) {
      return response
        .status(400)
        .send({ message: "category name already exxist" });
    }

    const newslugname = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    return response.status(201).send({
      success: true,
      message: "slug created successfully",
      newslugname: newslugname,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ success: false, message: "something went wrong" });
  }
};


export const updatecategorycontroller = async (request, response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;
    const category = await categoryModel.findByIdAndUpdate(id,

      {name,slug: slugify(name)},
      {new: true},
    );

    return response
      .status(201)
      .send({
        success: true,
        message: "category updated successfully",
        category,
      });
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ message: "something went wrong", error });
  }
};



export const getcategorycontroller = async (request, response) => {
  try {
  const category = await categoryModel.find();
  return response
      .status(200)
      .send({
        success: true,
        message: "get all category successfully",
        category

      });
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ message: "something went wrong", error });
  }
}



export const getsinglecategorycontroller = async (request, response) => {
  try {
    const {slug} = request.params
  const category = await categoryModel.findOne({slug});
  return response
      .status(200)
      .send({
        success: true,
        message: "single category get successfully",
        category

      });
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ message: "something went wrong", error });
  }
}


export const deletecategorycontroller = async (request, response) => {
  try {
  const { id } = request.params;
  const category = await categoryModel.findByIdAndDelete(id);
  return response
      .status(200)
      .send({
        success: true,
        message: "category deleted successfully",

      });
  } catch (error) {
    console.log(error);
    return response
      .status(400)
      .send({ message: "something went wrong", error });
  }
}