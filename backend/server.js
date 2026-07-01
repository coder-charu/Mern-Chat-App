import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./lib/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// to parse the incoming requests with Json payloads (from req.body)
app.use(express.json());
app.use(cookieParser());

// endpoints
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
