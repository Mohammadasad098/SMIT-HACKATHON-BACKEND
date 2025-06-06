import mongoose from "mongoose";
import Finances from "../models/data.models.js";
import User from "../models/user.models.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadImageToCloudinary = async (localPath) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localPath);
    return result.url;
  } catch (err) {
    return fs.unlinkSync(localPath);
  };
};


const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({
    message: "no image file uploaded",
  });

  try {
    const uploadResult = await uploadImageToCloudinary(req.file.path);
    if (!uploadResult) return res.status(500).json({
      message: "error occured while uploading image"
    });

    res.json({
      message: "image uploaded successfully",
      url: uploadResult,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "error occured while uploading image" });
  }
}


const addData = async (req, res) => {
  const { cnic, reasonForLoan, category, subCatogary, deposit, initialDeposit, loanPeriod, enrolledUsers } = req.body;

  if (!cnic) return res.status(400).json({ message: "cnic required" });
  if (!reasonForLoan) return res.status(400).json({ message: "reasonForLoan required" });
  if (!category) return res.status(400).json({ message: "category required" });
  if (!subCatogary) return res.status(400).json({ message: "subCatogary required" });
  if (!deposit) return res.status(400).json({ message: "deposit required" });
  if (!initialDeposit) return res.status(400).json({ message: "initialDeposit required" });
  if (!loanPeriod) return res.status(400).json({ message: "loanPeriod required" });

  try {
    const finance = await Finances.create({
      cnic,
      reasonForLoan,
      category,
      subCatogary,
      deposit,
      initialDeposit,
      loanPeriod,
      enrolledUsers: req.body.enrolledUsers
    });
    if (enrolledUsers) {
      await User.findByIdAndUpdate(enrolledUsers, {
        $push: { enrolledDatas: finance._id },
      });
    }

    return res.status(201).json({
      message: "Data added to database and enrolledProducts updated successfully",
      data: finance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};




const getAllDatas = async (req, res) => {
  const datas = await Finances.find({});
  res.status(200).json({
    datas: datas,
  });
};

const getDataWithId = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Finances.findOne({ enrolledUsers: id });

    if (!data) {
      return res.status(404).json({ message: "No data found!" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching finance data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};






const deleteData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not valid id" });
  }

  const data = await Datas.findOneAndDelete({ _id: id });

  if (!data) {
    return res.status(404).json({ error: "No data found" });
  }
  res.status(200).json({
    message: "data deleted successfully",
    data,
  });
};




const editData = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const updatedData = await Datas.findOneAndUpdate(
      { _id: id },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "No data found" });
    }

    res.status(200).json({
      message: "Data updated successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
};

export { addData , getAllDatas , getDataWithId , deleteData , editData , uploadImage };