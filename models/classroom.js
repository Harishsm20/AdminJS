import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
  name: { type: String, required: true, isVisible: true  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);
export default Classroom;
