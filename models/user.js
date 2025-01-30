import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: true },
  role: {
    type: String,
    required: true,
    enum: ["Principal", "Teacher", "Student"],
  },
  rollNo: {
    type: String,
    required: function () {
      return this.role === "Student"; // Required only for students
    },
  },
  subject: { type: String, required: function () { return this.role === "Teacher"; } }, // Subject for teachers
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: function () {
      return this.role === "Student"; // Required only for students
    },
  },
});


// Middleware to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
