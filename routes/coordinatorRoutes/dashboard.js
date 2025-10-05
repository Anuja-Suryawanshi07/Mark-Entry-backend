const express = require("express");
const router = express.Router();

//GET: Coordinators Dashboard
//http://localhost:7777/coordinator/dashboard

router.get("/dashboard",(req, res) => {
    return res.status(200).json
    ({
        status: "Success",
        message: "Welcome to Coordinators Dashboard",
    });
});

module.exports = router;
