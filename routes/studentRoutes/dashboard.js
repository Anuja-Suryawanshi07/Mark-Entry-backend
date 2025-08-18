const express = require("express");
const router = express.Router();

//GET: Student Dashboard
//http://localhost:7777/student/dashboard

router.get("/dashboard",(req, res) => {
    return res.status(200).json
    ({
        status: "Success",
        message: "Welcome to Student Dashboard",
    });
});

module.exports = router;