import { Router } from "express";
import { getAllAttendace, markAttendance } from "../controllers/attendanceController.js";

const router = Router()

router.post("/mark/:rollNo", markAttendance)
router.get("/all", getAllAttendace)

export default router;