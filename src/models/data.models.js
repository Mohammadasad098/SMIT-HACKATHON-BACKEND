import mongoose from "mongoose";

const Schema = mongoose.Schema;

const financeSchema = new Schema(
  {
    cnic: {
      type: Number,
      required: true,
    },
    reasonForLoan: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCatogary: {
      type: String,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    initialDeposit: {
      type : Number,
      required: true
    },
    loanPeriod: {
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

export default mongoose.model("Finances", financeSchema);