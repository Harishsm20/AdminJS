import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { ComponentLoader } from "adminjs";
import userResource from "../resource/userResource.js";
import classroomResource from "../resource/classroomResource.js";
import timetableResource from "../resource/timetableResource.js";
import timingResource from "../resource/timingResource.js";

// ✅ Create a single shared instance of ComponentLoader
const componentLoader = new ComponentLoader();
export { componentLoader }; // ✅ Ensure this is exported

// ✅ Register TimePicker globally so it can be used in all resources
componentLoader.add("TimePicker", "../components/TimePicker");

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const adminConfig = () => {
  return new AdminJS({
    resources: [userResource, classroomResource, timetableResource, timingResource],
    componentLoader, // ✅ Ensure componentLoader is passed here
    rootPath: "/admin",
    branding: {
      companyName: "Classroom Management",
      logo: "/assets/loader.gif",
      softwareBrothers: false,
    },
    locale: {
      language: "en",
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
