import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import userResource from "../resource/userResource.js";
import classroomResource from "../resource/classroomResource.js";
import timetableResource from "../resource/timetableResource.js";

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const adminConfig = () => {
  return new AdminJS({
    resources: [userResource, classroomResource, timetableResource],
    rootPath: "/admin",
  });
};

export default adminConfig;
