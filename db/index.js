import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/backend")
    .then(() => console.log("Mongodb connected successfully!"))
    .catch(() => "Failed to connect!")