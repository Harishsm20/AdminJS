import Classroom from "../models/classroom.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const userResource = {
  resource: User,
  options: {
    properties: {
      password: { isVisible: false },
      hashedPassword: {
        isVisible: { list: false, filter: false, show: false, edit: false },
      },
      role: {
        availableValues: [
          { value: "Principal", label: "Principal" },
          { value: "Teacher", label: "Teacher" },
          { value: "Student", label: "Student" },
        ],
      },
      classroom: {
        type: "reference",
        reference: "Classroom", 
        isVisible: true,
        isRequired: true,
      },
      mobile: { type: "string", isVisible: true },
    },
    actions: {
      new: {
        before: async (request) => {
          // Log the incoming payload to debug validation issues
          console.log("Incoming Request Payload:", request.payload);

          // Hash the password before saving
          if (request.payload.password) {
            const hashedPassword = await bcrypt.hash(request.payload.password, 10);
            request.payload = {
              ...request.payload,
              hashedPassword,
              password: undefined,
            };
          }

          return request;
        },
      },
    },
  },
};

export default userResource;
