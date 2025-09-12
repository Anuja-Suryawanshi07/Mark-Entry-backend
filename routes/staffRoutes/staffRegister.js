const express = require("express");
const pool = require("../../config/db");
const crypto = require("crypto-js");
const router = express.Router();

// POST: Register a new staff
// Example: POST http://localhost:7777/staff/register
/*
{
  "first_name": "Alok",
  "last_name": "Gandhi",
  "email": "alok@example.com",
  "mobile_number": "9759898975",
  "password": "alok123",
  "course_id": 1,
  "role_id": 1   // optional, default is 4
}
*/

router.post("/register", (req, res) => {
  const { first_name, last_name, email, mobile_number, password, course_id, role_id } = req.body || {};

  // Validate required fields
  if (!first_name || !last_name || !email || !mobile_number || !password || !course_id) {
    return res.status(400).json({
      status: "Error",
      message: "All fields are required (first_name, last_name, email, mobile_number, password, course_id)"
    });
  }

  // Hash the password before storing
  const hashPassword = String(crypto.SHA256(password.trim()));

  // Debug log
  console.log("🔑 Original password:", password);
  console.log("🔒 Hashed password:", hashPassword);

  // Use provided role_id or fallback to default (4 = staff)
  const finalRoleId = role_id || 4;

  // Insert into user table
  const sqlUser = `
    INSERT INTO user (first_name, last_name, email, mobile_number, password, role_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  pool.query(sqlUser, [first_name, last_name, email, mobile_number, hashPassword, finalRoleId], (err, userResult) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }

    const user_id = userResult.insertId;
    const staff_name = `${first_name} ${last_name}`;

    // Insert into staff table
    const sqlStaff = `
      INSERT INTO staff (staff_name, user_id, role_id, course_id)
      VALUES (?, ?, ?, ?)
    `;

    pool.query(sqlStaff, [staff_name, user_id, finalRoleId, course_id], (err2, staffResult) => {
      if (err2) {
        // rollback user insert if staff insert fails
        pool.query("DELETE FROM user WHERE user_id = ?", [user_id]);
        return res.status(500).json({
          status: "Error",
          message: "Staff insert failed, user rolled back",
          details: err2.message
        });
      }

      return res.status(201).json({
        status: "Success",
        message: `Staff registered successfully with Staff ID: ${staffResult.insertId}`,
        user_id
      });
    });
  });
});

module.exports = router;
