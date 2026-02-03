import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^(?:\+91|0)?[6-9]\d{9}$/.test(value);
        },
        message: "Please enter a valid Indian mobile number",
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
