import Attendance from "../models/attendance.js";
import markAttendanceFunction from "../utils/markAttendaceFunction.js"

export const markAttendance = async (req, res) => {
  try {
    const { rollNo } = req.params;
    const result = await markAttendanceFunction(rollNo)
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAttendace = async (req, res) => {
  try {
    const { date } = req.query;
    let filter = {};
    if (date) {
      const day = new Date(date);
      const startOfDay = new Date(day.setHours(0, 0, 0, 0));
      const endOfDay = new Date(day.setHours(23, 59, 59, 999));
      filter.date = { $gte: startOfDay, $lte: endOfDay };
    }
    const records = await Attendance.find(filter).populate("student");
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.msg });
  }
};
