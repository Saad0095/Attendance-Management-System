import express from "express"
import "./db/index.js"
import "dotenv/config.js"
const app = express()
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

app.listen(3000, ()=> {
    console.log("Server listened on localhost:3000");
})