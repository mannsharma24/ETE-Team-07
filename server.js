import dotenv from "dotenv";
import express from "express";
import app from "./app.js";
import cloudinary from "cloudinary";
import { fileURLToPath } from "url";
import path from "path";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Serve static files
app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port http://localhost:${process.env.PORT}`);
});
