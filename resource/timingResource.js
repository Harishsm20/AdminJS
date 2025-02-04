import Timing from "../models/timing.js";
import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const timingResource = {
  resource: Timing,
  options: {
    properties: {
      _id: { isVisible: false },
      name: { isVisible: true },
      startTime: {
        type: "string", // ✅ Display as a string
        isVisible: { list: true, filter: true, show: true, edit: true },
        components: {
          edit: componentLoader.add("TimePickerEdit", "./components/TimePickerEdit"),
          show: componentLoader.add("TimePickerShow", "./components/TimePickerShow"),
        },
      },
      endTime: {
        type: "string",
        isVisible: { list: true, filter: true, show: true, edit: true },
        components: {
          edit: componentLoader.add("TimePickerEdit", "./components/TimePickerEdit"),
          show: componentLoader.add("TimePickerShow", "./components/TimePickerShow"),
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
            request.payload.startTime = new Date(request.payload.startTime).toTimeString().slice(0, 5);
          }
          if (request.payload.endTime) {
            request.payload.endTime = new Date(request.payload.endTime).toTimeString().slice(0, 5);
          }
          return request;
        },
      },
      edit: {
        before: async (request) => {
          if (request.payload.startTime) {
            request.payload.startTime = new Date(request.payload.startTime).toTimeString().slice(0, 5);
          }
          if (request.payload.endTime) {
            request.payload.endTime = new Date(request.payload.endTime).toTimeString().slice(0, 5);
          }
          return request;
        },
      },
    },
  },
};

export default timingResource;
