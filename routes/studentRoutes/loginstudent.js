const express = require("express");

const router = express.Router();
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;


// POST: Student Login
// Example: POST http://localhost:7777/student/login
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
 console.log({email,password});
  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ status: "Error", message: "Email and password are required" });
  }

  // Step 1: Check if user exists with role_id = 5 (student)
  const sql = `
    SELECT u.user_id, u.first_name, u.last_name, u.email, u.password, s.student_id, s.group_id, s.student_name
    FROM user u
    INNER JOIN student s ON u.user_id = s.user_id
    WHERE u.email = ? AND u.role_id = 5
  `;
  console.log(sql);
  pool.query(sql, [email], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "Error", message: err.message });
    }

    if (results.length === 0) {
      console.log("No email user found");
      return res.status(401).json({ status: "Error", message: "Invalid email or password" });
    }

    const user = results[0];

    // Step 2: Check password (plain text check for now ⚠️)
    if (user.password !== crypto.SHA256(password).toString()) {
      console.log("stored hash",user.password);
      console.log("request password hash",crypto.SHA256(password).toString());
      return res.status(401).json({ status: "Error", message: "Invalid email or password" });
    }

    // Step 3: Login success
   
      const payload ={
        user_id: user.user_id,
        student_id: user.student_id,
        student_name: user.student_name,
        email: user.email,
        group_id: user.group_id,
      };
      console.log(payload);
      
 
     // Generate JWT token
    const token = jwt.sign(payload, SECRET_KEY);
    console.log(token);


    // Step 3: Login success
    return res.status(200).json({
      status: "Success",
      message: "Login successful",
      token,
    });
  });
   });

module.exports = router;
