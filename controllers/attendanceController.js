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

export const getAllAttendance = async (req, res) => {
  try {
    const { date } = req.query;
    let matchStage = {};

    if (date) {
      const day = new Date(date);
      const startOfDay = new Date(day.setHours(0, 0, 0, 0));
      const endOfDay = new Date(day.setHours(23, 59, 59, 999));

      matchStage.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const records = await Attendance.aggregate([
      { $match: matchStage }, 
      {
        $lookup: {
          from: "users",             
          localField: "student",     
          foreignField: "_id",       
          as: "studentDetails",      
        },
      },
      { $unwind: "$studentDetails" },
      {
        $project: {
          _id: 1,
          date: 1,
          status: 1,
          "studentDetails._id": 1,
          "studentDetails.name": 1,
          "studentDetails.email": 1,
          "studentDetails.rollNo": 1,
        },
      },
    ]);

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
