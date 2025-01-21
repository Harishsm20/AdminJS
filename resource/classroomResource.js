import Classroom from "../models/classroom.js";

const classroomResource = {
  resource: Classroom,
  options: {
    properties: {
      name: { isVisible: { list: true, filter: true, show: true, edit: true } },
      teacher: {
        reference: "User",
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
    },
  },
};

export default classroomResource;
