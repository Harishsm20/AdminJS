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

            // Auto-generate password
            if (email) {
              const generatedPassword =
                role === "Student" ? `${email.split("@")[0]}${rollNo}` : email.split("@")[0];
              const hashedPassword = await bcrypt.hash(generatedPassword, 10);
              request.payload = { ...request.payload, hashedPassword, password: undefined };
            }

            return request;
          } catch (error) {
            console.error("Validation Error:", error);
            throw error;
          }
        },
      },
    },
  },
  isAccessible: ({ currentAdmin }) => {
    return currentAdmin && (currentAdmin.role === "Principal" || currentAdmin.role === "Teacher");
  },
};

export default userResource;
