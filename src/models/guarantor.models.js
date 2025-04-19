import mongoose from "mongoose";

const Schema = mongoose.Schema;

const guarantorSchema = new Schema(
  {
    name1: {
      type: String,
      required: true,
    },
    email1: {
      type: String,
      required: true,
    },
    location1: {
      type: String,
      required: true,
    },
    cnic1: {
      type: Number,
      required: true,
    },
    name2: {
      type: String,
      required: true,
    },
    email2: {
      type: String,
      required: true,
    },
    location2: {
      type: String,
      required: true,
    },
    cnic2: {
      type: Number,
      required: true,
    },
    enrolledUsers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Guarantors", guarantorSchema);