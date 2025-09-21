const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const app = express();
//const { checkAuth } = require("./middleware/checkAuth");

// Middleware
app.use(express.json());
app.use(cors());
//app.use(checkAuth)
//app.use(checkAuth)


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

//  Mount routes (no duplicates!)
app.use("/staff", staffRoutes);

const getAllStudentByCourseName = require("./routes/coordinatorRoutes")


//routes

app.use("/roles", roleRoutes);
app.use("/batch", batchRoutes);
app.use("/course", courseRoutes);
app.use("/module", moduleRoutes);

app.use("/marks", marksRoutes);
app.use("/student_group", studentGroupRoutes);
app.use("/student", studentRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/mentor", mentorRoutes);
app.use("/coordinator", coordinatorRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
