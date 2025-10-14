import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  user_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], required: true },
  phone_no: { type: String },
  address: { type: String },
}, { collection: "users" }); // match your MongoDB collection name

const User = mongoose.model("User", userSchema);
export default User;
