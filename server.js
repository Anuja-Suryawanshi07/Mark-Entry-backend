const express = require("express");
const app = express();
const { PORT} = require("./config");
const testRoutes = require("./routes/testRoutes");
const getAllUsers = require("./routes/userRoutes/getallusers");
const addUsers = require("./routes/userRoutes/addusers");
const updateUsers = require("./routes/userRoutes/updateusers");
const deleteUsers = require("./routes/userRoutes/deleteusers");
const getAllStaff = require("./routes/staffRoutes/getallstaff");
const addStaff = require("./routes/staffRoutes/addstaff");
const updateStaff = require("./routes/staffRoutes/updatestaff");
const deleteStaff = require("./routes/staffRoutes/deletestaff");
const getMarks = require("./routes/marksRoutes/getMarks");
const addMarks = require("./routes/marksRoutes/addMarks");
const updateMarks = require("./routes/marksRoutes/updateMarks");
const deleteMarks = require("./routes/marksRoutes/deleteMarks");


//const roleRoutes = require("./routes/roleRoutes/index");
//const batchRoutes = require("./routes/batchRoutes/index");

// middlewares
app.use(express.json());

//routes
//user routes
app.use("/", testRoutes);
app.use("/users", getAllUsers);
app.use("/users", addUsers);
app.use("/users",updateUsers);
app.use("/users",deleteUsers);

//staff routes
app.use("/staff",getAllStaff);
app.use("/staff",addStaff);
app.use("/staff",updateStaff);
app.use("/staff",deleteStaff);

//marks routes
app.use("/marks",getMarks);
app.use("/marks",addMarks);
app.use("/marks",updateMarks);
app.use("/marks",deleteMarks);

//app.use("/roles", roleRoutes);
//app.use("/batch", batchRoutes);


app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
})