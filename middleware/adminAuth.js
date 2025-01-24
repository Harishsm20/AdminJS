import AdminJSExpress from "@adminjs/express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { generateToken, refreshToken } from "../service/authService.js";

const adminAuth = (admin) => {
  return AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        try {
          // Fetch the admin user from the database
          const adminUser = await User.findOne({ email }).select("+password");
          if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
            return null; // Authentication failed
          }

          // Generate a JWT token
          const token = generateToken({ email: adminUser.email, role: adminUser.role });

          // Return user details and the token
          return { email: adminUser.email, role: adminUser.role, token };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
      cookieName: "adminjs",
      cookiePassword: process.env.COOKIE_SECRET || "some-secure-cookie-password",
    },
    null,
    {
      loginPath: "/admin/login",
      logoutPath: "/admin/logout",
      before: async (req, res, next) => {
        const token = req.cookies?.token;

        if (!token) {
          return res.redirect("/admin/login");
        }

        try {
          // Verify the token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded; // Attach user information to the request
          next();
        } catch (err) {
          console.log("Token verification failed. Attempting refresh...");

          // Try to refresh the token if it's expired
          const refreshedToken = refreshToken(token);
          if (refreshedToken) {
            res.cookie("token", refreshedToken, {
              httpOnly: true,
              maxAge: 60 * 60 * 1000, // 1 hour
            });
            req.user = jwt.verify(refreshedToken, process.env.JWT_SECRET); // Attach refreshed user info
            next();
          } else {
            console.log("Token expired or invalid. Redirecting to login.");
            res.clearCookie("token");
            return res.redirect("/admin/login");
          }
        }
      },
      after: async (req, res, next) => {
        // Save refreshed token back to the cookies, if applicable
        if (req.user?.token) {
          res.cookie("token", req.user.token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour
          });
        }
        next();
      },
    }
  );
};

export default adminAuth;
