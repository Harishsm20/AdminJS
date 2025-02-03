import Timing from "../models/timing.js";

const timingResource = {
  resource: Timing,
  options: {
    properties: {
      _id: { isVisible: false },
      name: { isVisible: true },
      startTime: {
        type: "time", // ✅ Use DateTime Picker in AdminJS
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      endTime: {
        type: "time", // ✅ Use DateTime Picker in AdminJS
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
      type: {
        availableValues: [
          { value: "Period", label: "Period" },
          { value: "Break", label: "Break" },
        ],
      },
    },
    actions: {
      new: {
        before: async (request) => {
          if (request.payload.startTime) {
            request.payload.startTime = new Date(request.payload.startTime)
              .toTimeString()
              .slice(0, 5); // ✅ Extract HH:mm
          }
          if (request.payload.endTime) {
            request.payload.endTime = new Date(request.payload.endTime)
              .toTimeString()
              .slice(0, 5); // ✅ Extract HH:mm
              
          }
          return request;
        },
      },
      edit: {
        before: async (request) => {
          if (request.payload.startTime) {
            request.payload.startTime = new Date(request.payload.startTime)
              .toTimeString()
              .slice(0, 5); // ✅ Extract HH:mm
              console.log(request.payload.endTime);
          }
          if (request.payload.endTime) {
            request.payload.endTime = new Date(request.payload.endTime)
              .toTimeString()
              .slice(0, 5); // ✅ Extract HH:mm
          }
          return request;
        },
      },
    },
  },
};

export default timingResource;
