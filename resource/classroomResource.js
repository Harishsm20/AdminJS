import Classroom from "../models/classroom.js";
import Timetable from "../models/timetable.js";
import User from "../models/user.js";
import Timing from "../models/timing.js";

const classroomResource = {
  resource: Classroom,
  options: {
    properties: {
      name: { isVisible: true },
      teacher: { type: "reference", reference: "User" },
      students: { type: "reference", reference: "User", isArray: true },
      timetable: { type: "reference", reference: "Timetable", isArray: true },
    },
    actions: {
      new: {
        before: async (request) => {
          console.log("Creating Classroom:", request.payload);
          return request;
        },
      },
    },
  },
};

export default classroomResource;
