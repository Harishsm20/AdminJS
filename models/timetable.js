import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true },
  day: { type: String, required: true, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
  schedule: [
    {
      period: { type: mongoose.Schema.Types.ObjectId, ref: "Timing", required: true },
      subject: { type: String, required: true },
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
  ],
});

const Timetable = mongoose.model("Timetable", TimetableSchema);
export default Timetable;
