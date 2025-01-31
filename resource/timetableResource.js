import Timetable from "../models/timetable.js";
import User from "../models/user.js";
import Timing from "../models/timing.js";
import Classroom from "../models/classroom.js";

const timetableResource = {
  resource: Timetable,
  options: {
    properties: {
      _id: { isVisible: false },
      classroom: { type: "reference", reference: "Classroom", isVisible: true },
      day: {
        availableValues: [
          { value: "Monday", label: "Monday" },
          { value: "Tuesday", label: "Tuesday" },
          { value: "Wednesday", label: "Wednesday" },
          { value: "Thursday", label: "Thursday" },
          { value: "Friday", label: "Friday" },
          { value: "Saturday", label: "Saturday" },
        ],
      },
      schedule: {
        type: "mixed",
        isArray: true,
        components: {
          subject: { type: "string" },
          period: { type: "reference", reference: "Timing" }, // ✅ Fix reference
          teacher: { type: "reference", reference: "User" },
        },
      },
    },
    actions: {
      new: {
        before: async (request) => {
          console.log("Creating Timetable Entry:", request.payload);
          return request;
        },
      },
    },
  },
};

export default timetableResource;
