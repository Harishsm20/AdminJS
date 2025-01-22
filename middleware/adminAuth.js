import AdminJSExpress from "@adminjs/express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const adminAuth = (admin) => {
  return AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        try {
          // Fetch admin user from the database
          const adminUser = await User.findOne({ email });
          console.log("password : ",adminUser,"\n incoming password: ", password)
          // If the user doesn't exist or the password doesn't match, return null
          if (!adminUser ) {
            return null;
          }

          // Return authenticated user details
          return { email: adminUser.email };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
      cookieName: "adminjs",
      cookiePassword: process.env.COOKIE_SECRET || "some-secure-cookie-password",
    },
    null, // Add custom session options here if needed
    {
      loginPath: "/admin/login",
      logoutPath: "/admin/logout",
    }
  );
};

export default adminAuth;
