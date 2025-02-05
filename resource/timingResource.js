import Timing from "../models/timing.js";

const timingResource = {
  resource: Timing,
  options: {
    properties: {
      _id: { isVisible: false },
      name: { isVisible: true },
      startTime: {
        type: "string", // ✅ Display as string instead of time picker
        isVisible: { list: true, filter: true, show: true, edit: true },
        props: {
          placeholder: "HH:mm", // Help users enter correct format
        },
      },
      endTime: {
        type: "string",
        isVisible: { list: true, filter: true, show: true, edit: true },
        props: {
          placeholder: "HH:mm",
        },
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
            request.payload.startTime = request.payload.startTime.slice(0, 5); // ✅ Ensure HH:mm format
          }
          if (request.payload.endTime) {
            request.payload.endTime = request.payload.endTime.slice(0, 5);
          }
          return request;
        },
      },
      edit: {
        before: async (request) => {
          if (request.payload.startTime) {
            request.payload.startTime = request.payload.startTime.slice(0, 5);
          }
          if (request.payload.endTime) {
            request.payload.endTime = request.payload.endTime.slice(0, 5);
          }
          return request;
        },
      },
    },
  },
};

export default timingResource;
