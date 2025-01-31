import Timing from "../models/timing.js";
import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

// Register the TimePicker component
const TimePickerComponent = componentLoader.add("TimePicker", "../components/TimePicker.js");

const timingResource = {
  resource: Timing,
  options: {
    properties: {
      _id: { isVisible: false },
      name: { isVisible: true },
      startTime: {
        type: "string",
        isVisible: true,
        components: { edit: TimePickerComponent }, // Use the TimePicker component
      },
      endTime: {
        type: "string",
        isVisible: true,
        components: { edit: TimePickerComponent }, // Use the TimePicker component
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
            request.payload.startTime = request.payload.startTime.slice(0, 5); // Keep only HH:mm
          }
          if (request.payload.endTime) {
            request.payload.endTime = request.payload.endTime.slice(0, 5); // Keep only HH:mm
          }
          return request;
        },
      },
    },
  },
};

export default timingResource;
