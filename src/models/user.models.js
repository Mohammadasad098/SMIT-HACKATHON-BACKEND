import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  enrolledDatas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Finances",
    },
  ],
  enrolledGuarantor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guarantors",
    },

  ],
  // profileImage: { 
  //   type: String,
  //   required: [true, "profileImage is required"], 
  // },
},
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("Users", userSchema);