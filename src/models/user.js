const mongoose = require("mongoose");

const userAdressSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});



let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 255,
      uppercase: true,
      // required: "name",
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      // required: "email",
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 1024,
      //required: "password",
    },

    firstname: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    lastname: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    telephone: {
      type: Number,
      max: 10,
    },
    myaddress: userAdressSchema,

    role: {
      type: String,
      enum: ["Admin", "user", "member"],
      default: "user",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = {
   UserModel,
  userAdressSchema,
};
