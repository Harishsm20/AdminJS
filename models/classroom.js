import mongoose from "mongoose";

const ClassroomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, isVisible: true},
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  timetable: [{ type: mongoose.Schema.Types.ObjectId, ref: "Timetable" }],
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);
export default Classroom;
