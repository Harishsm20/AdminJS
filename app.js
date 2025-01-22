import express from "express";
import mongoose from "mongoose";
import adminConfig from "./config/adminConfig.js";
import adminAuth from "./middleware/adminAuth.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = 8000;

const start = async () => {
  const app = express();

  await mongoose.connect(process.env.MONGO_URL);

  const admin = adminConfig();

  const adminRouter = adminAuth(admin);

  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`AdminJS started at http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();
