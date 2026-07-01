import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes.js";
import connectToMongoDB from "./lib/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// to parse the incoming requests with Json payloads (from req.body)
app.use(express.json());
app.use(cookieParser());

// endpoints
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
