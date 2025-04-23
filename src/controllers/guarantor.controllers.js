import mongoose from "mongoose";
import Guarantors from "../models/guarantor.models.js";
import User from "../models/user.models.js";


const addData = async (req, res) => {
  const { name1, email1 , location1 , cnic1 , name2 , email2 , location2 , cnic2 , enrolledUsers } = req.body;

  if (!name1) return res.status(400).json({ message: "name1 required" });
  if (!email1) return res.status(400).json({ message: "email1 required" });
  if (!location1) return res.status(400).json({ message: "location1 required" });
  if (!cnic1) return res.status(400).json({ message: "cnic1 required" });
  if (!name2) return res.status(400).json({ message: "name2 required" });
  if (!email2) return res.status(400).json({ message: "email2 required" });
  if (!location2) return res.status(400).json({ message: "location2 required" });
  if (!cnic2) return res.status(400).json({ message: "cnic2 required" });

 try{
  const guarantor = await Guarantors.create({
    name1,
    email1,
    location1,
    cnic1,
    name2,
    email2,
    location2,
    cnic2,
    enrolledUsers,
  });
if (enrolledUsers) {
      await User.findByIdAndUpdate(enrolledUsers, {
        $push: { enrolledGuarantor: guarantor._id },
      });
    }

    return res.status(201).json({
      message: "Data added to database and enrolledGuarantor updated successfully",
      data: guarantor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export {addData}
