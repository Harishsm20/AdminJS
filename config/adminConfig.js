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
      logo: "https://google.com/logo.png", 
      softwareBrothers: false, 
    },
    locale: {
      translations: {
        labels: {
          loginWelcome: "Admin Login",
        },
      },
    },
  });
};

export default adminConfig;
