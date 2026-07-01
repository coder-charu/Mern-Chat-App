import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  console.log("Request received");
  res.send("initial route");
});

app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
