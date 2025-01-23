import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


/**
 * Generate a new JWT token
 * @param {Object} payload - The payload for the token
 * @returns {string} - The JWT token
 */
export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  };
  

/**
 * Refresh an existing JWT token
 * @param {string} token - The expired token
 * @returns {string|null} - The refreshed JWT token or null if invalid
 */
export const refreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    const newToken = generateToken({ email: decoded.email, role: decoded.role });
    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
