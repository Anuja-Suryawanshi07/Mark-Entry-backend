const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 7777;


// Import the DB pool
const db = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const roleRoutes = require("./routes/roleRoutes");
const batchRoutes = require("./routes/batchRoutes");
const courseRoutes = require("./routes/courseRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");
const marksRoutes = require("./routes/marksRoutes");
const studentGroupRoutes = require("./routes/student_groupRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const coordinatorRoutes = require("./routes/coordinatorRoutes");
const getAllCourseBatch = require("./routes/courseByBatchRoutes/index");
const marksSchemeRoute = require("./routes/marksSchemeRoutes");
const getAllStudentByCourseName = require("./routes/coordinatorRoutes");

// Routes
app.use("/roles", roleRoutes);
app.use("/batch", batchRoutes);
app.use("/course", courseRoutes);
app.use("/module", moduleRoutes);
app.use("/staff", staffRoutes);
app.use("/marks", marksRoutes);
app.use("/student_group", studentGroupRoutes);
app.use("/student", studentRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/mentor", mentorRoutes);
app.use("/coordinator", coordinatorRoutes);
app.use("/course", getAllCourseBatch);
app.use("/coordinator", getAllStudentByCourseName);
app.use("/marks-scheme", marksSchemeRoute);

// ✅ Test route (optional)
app.get("/", (req, res) => {
  res.send("Backend deployed successfully on Vercel 🚀");
});

// ❌ Remove manual app.listen() — Vercel handles this
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// ✅ Export the app for Vercel
module.exports = app;
