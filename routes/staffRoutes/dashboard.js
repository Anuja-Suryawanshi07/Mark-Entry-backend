const express = require("express");
const router = express.Router();

//GET: Staff Dashboard
//http://localhost:7777/staff/dashboard

router.get("/dashboard", (req,res) => {
    return res.status(200).json 
    ({
        status: "Success",
        message: "Welcome to the Staff Dashboard",
    });
});

module.exports = router;