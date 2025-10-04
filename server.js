//server.js


const express = require("express");
const cors = require("cors");

// Import the DB pool
const db = require("./config/db");
const app = express();
const PORT = process.env.PORT || 7777;


const { checkAuth } = require("./middleware/checkAuth");

// Middleware
app.use(express.json());
app.use(cors());
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

const coordinatorRoutes = require("./routes/coordinatorRoutes")
const getAllCourseBatch = require("./routes/courseByBatchRoutes/index")
const marksSchemeRoute = require("./routes/marksSchemeRoutes");
const getAllStudentByCourseName = require("./routes/coordinatorRoutes");

//routes
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

app.listen(PORT, () => {
console.log(`Server Started at http://localhost:${PORT}`);
});
// app.listen(1111, (err)=>{
//   console.log("serveerr 1111",err);
// })
