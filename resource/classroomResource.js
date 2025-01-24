import Classroom from "../models/classroom.js";

const classroomResource = {
  resource: Classroom,
  options: {
    properties: {
      name: { isVisible: true },
    },
  },
  isAccessible: ({ currentAdmin }) => {
    // Allow access only for Principals
    return currentAdmin && currentAdmin.role === "Principal";
  },
};

export default classroomResource;

