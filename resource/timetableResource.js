import Timetable from "../models/timetable.js";

const timetableResource = {
  resource: Timetable,
  options: {
    properties: {
      subject: { isVisible: { list: true, filter: true, show: true, edit: true } },
      day: { isVisible: { list: true, filter: true, show: true, edit: true } },
    },
  },
};

export default timetableResource;
