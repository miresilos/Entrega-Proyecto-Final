import mongoose from "mongoose";
import { config } from "../utils/config.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  admin: {
    type: Boolean,
    required: true,
  },
});

UserSchema.methods.setImgUrl = function setImgUrl(filename) {
  const HOST = 'http://localhost';
  const PORT = config.port;
  this.imgUrl = `${HOST}:${PORT}/img/${filename}`
}

export const UserModel = mongoose.model("User", UserSchema);