import User from "../models/user.js";
import jwt from "jsonwebtoken";
import markAttendanceFunction from "../utils/markAttendaceFunction.js";

const generateRollNo = async () => {
  const count = await User.countDocuments();
  return String(count + 1).padStart(3, "0"); 
};

export const register = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    const rollNo = await generateRollNo();

    const user = new User({
      name,
      email,
      rollNo,
      password,
      contact,
    });

    await user.save();
    res.json({ message: "User registered successfully!", rollNo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid roll number" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const attendanceResult = await markAttendanceFunction(user.rollNo);

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, rollNo: user.rollNo },
      attendance: attendanceResult,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
