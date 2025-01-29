import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import userResource from "../resource/userResource.js";
import classroomResource from "../resource/classroomResource.js";
import timetableResource from "../resource/timetableResource.js";


// Register the Mongoose adapter
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const adminConfig = () => {
  return new AdminJS({
    resources: [userResource, classroomResource, timetableResource],
    rootPath: "/admin",
    branding: {
      companyName: "Classroom Management",
      logo: "/assets/loader.gif", 
      softwareBrothers: false, 
    },
    locale: {
      language: "en", // Default language
      translations: {
        labels: {
          role: {
            Principal: "Principal",
            Teacher: "Teacher",
            Student: "Student",
          },
        },
        properties: {
          email: "Email",
          name: "Name",
          mobile: "Mobile",
          role: "Role",
          rollNo: "Roll Number",
          classroom: "Classroom",
        },
        actions: {
          new: "Add New User",
        },
      },
    },
  });
};

export default adminConfig;
