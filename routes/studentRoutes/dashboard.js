const express = require("express");
;
const router = express.Router();
const { USER_TABLE } = require("../../config");

// POST: Student Login & Dashboard
// http://localhost:7777/student/dashboard
/*
{
  "email": "rahul.joshi@example.com",
  "password": "studpass"
}
*/
router.post("/dashboard", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Error",
      message: "Email and password are required"
    });
  }

  // Check if user exists with email & password

  const sql = `SELECT user_id, first_name, last_name, role_id 
               FROM ${USER_TABLE} 
               WHERE email = ? AND password = ?`;

  pool.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ status: "Error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid email or password"
      });
    }

    const user = results[0];

    // Check role_id

    if (user.role_id !== 5) {
      return res.status(403).json({
        status: "Error",
        message: "Access denied. You are not a student"
      });
    }

    // Success → Student Dashboard
    
    return res.status(200).json({
      status: "Success",
      message: `Welcome to Student Dashboard, ${user.first_name} ${user.last_name}`,
      studentDetails: {
        user_id: user.user_id,
        name: `${user.first_name} ${user.last_name}`,
        email: email
      }
    });
  });
});

module.exports = router;
