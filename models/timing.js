import mongoose from "mongoose";

const TimingSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Period 1", "Break"
  startTime: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ }, // Store in HH:mm format
  endTime: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ }, // Validate HH:mm format
  type: { type: String, enum: ["Period", "Break"], required: true },
});

const Timing = mongoose.model("Timing", TimingSchema);
export default Timing;
