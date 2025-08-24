const express = require("express");
const router = express.Router();

//GET: Admin Dashboard
//http://localhost:7777/admin/dashboard

router.get("/dashboard",(req, res) => {
    return res.status(200).json
    ({
        status: "Success",
        message: "Welcome to Admin Dashboard",
    });
});

module.exports = router;