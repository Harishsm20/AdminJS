import Timetable from "../models/timetable.js";

const timetableResource = {
  resource: Timetable,
  options: {
    properties: {
      name: { isVisible: true },
      subject: { isVisible: { list: true, filter: true, show: true, edit: true } },
      day: { isVisible: { list: true, filter: true, show: true, edit: true } },
    },
  },
  isAccessible: ({ currentAdmin }) => {
    // Allow access for all roles
    return currentAdmin && (currentAdmin.role === "Principal" || currentAdmin.role === "Student");
  },
};

export default timetableResource;
