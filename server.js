const express = require("express");
const app = express();
const { PORT} = require("./config");
const testRoutes = require("./routes/testRoutes");
const getAllUsers = require("./routes/userRoutes/getallusers");
const addUser = require("./routes/userRoutes/adduser");
const updateUser = require("./routes/userRoutes/updateuser");
const deleteUser = require("./routes/userRoutes/deleteuser");

// middlewares
app.use(express.json());

//routes
app.use("/", testRoutes);
app.use("/users", getAllUsers);
app.use("/users", addUser);
app.use("/user",updateUser);
app.use("/user",deleteUser);


app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
})