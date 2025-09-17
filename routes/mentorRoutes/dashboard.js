const express = require("express");
const router = express.Router();

//GET: Mentors Dashboard
//http://localhost:5555/mentor/dashboard

router.get("/dashboard",(req, res) => {
    return res.status(200).json
    ({
        status: "Success",
        message: "Welcome to Mentors Dashboard",
    });
});

module.exports = router;