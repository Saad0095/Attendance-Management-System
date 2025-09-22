import User from "../models/user.js"
import Attendance from "../models/attendance.js"

const markAttendanceFunction = async (rollNo) => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  if (dayOfWeek != 2 && dayOfWeek != 4) {
    return res.json({ error: "You can't mark your attendance t0day!" });
  }

  const user = await User.findOne({ rollNo });
  if (!user) {
    return res.json({ error: "User not found!" });
  }

  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const alreadyMarked = await Attendance.findOne({
    student: user._id,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  if (alreadyMarked) {
    return res.json({ error: "Attendance already marked!" });
  }

  const attendance = new Attendance({ student: user._id, status: "present" });
  await attendance.save();
  return { message: "Attendance marked successfully!" };
};

export default markAttendanceFunction