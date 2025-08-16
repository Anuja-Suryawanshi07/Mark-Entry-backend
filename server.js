const express = require("express");
const app = express();
const { PORT } = require("./config");

const roleRoutes = require("./routes/roleRoutes/index");
const batchRoutes = require("./routes/batchRoutes/index");
const courseRoutes = require("./routes/courseRoutes/index");
const moduleRoutes = require("./routes/moduleRoutes/index");
const userRoutes = require("./routes/userRoutes/index");
const staffRoutes = require("./routes/staffRoutes/index");
const marksRoutes = require("./routes/marksRoutes/index");
const studentGroupRoutes = require("./routes/student_groupRoutes");
const studentRoutes = require("./routes/studentRoutes/index");
const adminRoutes = require("./routes/adminRoutes");

// middleware
app.use(express.json());

//routes
app.use("/roles", roleRoutes);
app.use("/batch", batchRoutes);
app.use("/course", courseRoutes);
app.use("/module", moduleRoutes);
app.use("/staff", staffRoutes);
app.use("/marks", marksRoutes);

app.use("/student-group", studentGroupRoutes);

app.use("/student", studentRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
