// seed.js
import mongoose from "mongoose";
import User from "../models/user.js";
import Attendance from "../models/attendance.js"; // ✅ fixed typo

const runSeeder = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/backend");

    // ----- Seed Users -----
    const usersData = [
      {
        name: "Alice Smith",
        email: "alice@example.com",
        rollNo: "A001",
        password: "password123",
        contact: 9876543210,
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        rollNo: "A002",
        password: "password123",
        contact: 9123456780,
      },
      {
        name: "Charlie Brown",
        email: "charlie@example.com",
        rollNo: "A003",
        password: "password123",
        contact: 9988776655,
      },
      {
        name: "Diana Prince",
        email: "diana@example.com",
        rollNo: "A004",
        password: "password123",
        contact: 9098765432,
      },
      {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        rollNo: "A005",
        password: "password123",
        contact: 9345678901,
      },
      {
        name: "Fiona Gallagher",
        email: "fiona@example.com",
        rollNo: "A006",
        password: "password123",
        contact: 9012345678,
      },
      {
        name: "George Miller",
        email: "george@example.com",
        rollNo: "A007",
        password: "password123",
        contact: 9234567890,
      },
      {
        name: "Hannah Davis",
        email: "hannah@example.com",
        rollNo: "A008",
        password: "password123",
        contact: 9456789012,
      },
      {
        name: "Ian Wright",
        email: "ian@example.com",
        rollNo: "A009",
        password: "password123",
        contact: 9567890123,
      },
      {
        name: "Julia Roberts",
        email: "julia@example.com",
        rollNo: "A010",
        password: "password123",
        contact: 9678901234,
      },
    ];

    await User.deleteMany({});
    const users = await User.insertMany(usersData);
    console.log("✅ Users seeded");

    // ----- Seed Attendance -----
    const attendanceStatuses = ["present", "absent", "leave"]; // match schema enum
    const attendanceRecords = users.map((user, index) => ({
      student: user._id,
      status: attendanceStatuses[index % 3], // cycle through present/absent/leave
      date: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000), // yesterday, day before, etc.
    }));

    await Attendance.deleteMany({});
    await Attendance.insertMany(attendanceRecords);
    console.log("✅ Attendance seeded");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
};

runSeeder();
