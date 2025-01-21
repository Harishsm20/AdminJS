import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  hashedPassword: { type: String },
  role: { type: String, enum: ["Principal", "Teacher", "Student"], required: true },
  mobile: { type: String, required: false },
});

const User = mongoose.model("User", userSchema);
export default User;
