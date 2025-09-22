import { Router } from "express";
import { getAllAttendance, markAttendance } from "../controllers/attendanceController.js";

const router = Router()

router.post("/mark/:rollNo", markAttendance)
router.get("/all", getAllAttendance)

export default router;