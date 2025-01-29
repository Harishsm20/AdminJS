import Classroom from "../models/classroom.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const userResource = {
  resource: User,
  options: {
    properties: {
      password: { isVisible: false },
      hashedPassword: { isVisible: false }, // Remove handling of hashedPassword
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
        isRequired: ({ record }) => record?.role === "Student",
      },
      rollNo: {
        type: "string",
        isVisible: ({ record }) => record?.role === "Student",
        isRequired: ({ record }) => record?.role === "Student",
      },
      mobile: { type: "string", isVisible: true },
    },
    actions: {
      new: {
        before: async (request) => {
          try {
            console.log("Incoming Request Payload:", request.payload);
            const { email, role, rollNo } = request.payload;

            if (role === "Student" && (!email || !rollNo)) {
              throw new Error("Email and roll number are required for students.");
            }

            if (email) {
              // Generate plain password and save it under "password" field
              const generatedPassword =
                role === "Student" ? `${email.split("@")[0]}${rollNo}` : email.split("@")[0];
              
              request.payload = { ...request.payload, password: generatedPassword };
            }

            return request;
          } catch (error) {
            console.error("Validation Error:", error);
            throw error;
          }
        },
      },

      edit: {
        before: async (request) => {
          if (request.payload.password) {
            request.payload.password = await bcrypt.hash(request.payload.password, 10);
          }
          return request;
        },
      },

      delete: {
        after: async (response, request, context) => {
          console.log(`User with ID ${context.record.id} deleted.`);
          return response;
        },
      },
    },
  },
  isAccessible: ({ currentAdmin }) => {
    return currentAdmin && (currentAdmin.role === "Principal" || currentAdmin.role === "Teacher");
  },
};

export default userResource;
