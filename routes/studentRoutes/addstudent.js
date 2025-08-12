// routes/student.js
const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

// POST: add new student
// Example: POST http://localhost:7777/students/add-student
router.post("/add-student", (req, res) => {
  const { roll_number, prn_number, group_id, user_id } = req.body;

  const sql = `
    INSERT INTO student 
    (roll_number, prn_number, group_id, user_id, created_at, updated_at) 
    VALUES (?, ?, ?, ?, CURDATE(), CURDATE())
  `;

  pool.query(
    sql,
    [roll_number, prn_number, group_id, user_id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ status: "Error", error: error.message });
      }
      return res.status(201).json({
        status: "Success",
        message: `Student added successfully with ID: ${result.insertId}`,
      });
    }
  );
});

module.exports = router;
