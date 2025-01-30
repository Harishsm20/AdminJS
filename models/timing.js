import mongoose from "mongoose";

const TimingSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Period 1", "Break"
  startTime: { type: String, required: true }, // e.g., "09:00 AM"
  endTime: { type: String, required: true }, // e.g., "09:45 AM"
  type: { type: String, enum: ["Period", "Break"], required: true },
});

const Timing = mongoose.model("Timing", TimingSchema);
export default Timing;
