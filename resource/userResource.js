import Classroom from "../models/classroom.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const userResource = {
  resource: User,
  options: {
    properties: {
      _id: { isVisible: false },
      password: { isVisible: false },
      hashedPassword: { isVisible: false },

      // ✅ Role at the top
      role: {
        position: 1,
        availableValues: [
          { value: "Principal", label: "Principal" },
          { value: "Teacher", label: "Teacher" },
          { value: "Student", label: "Student" },
        ],
      },

      email: { type: "string", position: 2 },
      mobile: { type: "string", position: 3 },

      classroom: {
        type: "reference",
        reference: "Classroom",
        position: 4,
        isVisible: { list: true, filter: true, show: true, edit: true },
        isRequired: ({ record, currentAdmin }) => record?.role === "Student",
      },

      // ✅ Roll No appears last and is visible only for students
      rollNo: {
        type: "string",
        position: 100,
        isVisible: { list: true, filter: true, show: ({ record }) => record?.role === "Student", edit: ({ record }) => record?.role === "Student" },
        isRequired: ({ record }) => record?.role === "Student",
      },

      // ✅ Subject appears last and is visible only for teachers
      subject: {
        availableValues: [
          { value: "Physics", label: "Physics" },
          { value: "Chemistry", label: "Chemistry" },
          { value: "Maths", label: "Maths" },
          { value: "Biology", label: "Biology" },
          { value: "Social", label: "Social" },
          { value: "Tamil", label: "Tamil" },
          { value: "English", label: "English" },
        ],
        position: 101,
        isVisible: { list: true, filter: true, show: ({ record }) => record?.role === "Teacher", edit: ({ record }) => record?.role === "Teacher" },
      },
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
