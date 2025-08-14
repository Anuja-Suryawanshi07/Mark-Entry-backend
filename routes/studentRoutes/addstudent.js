// routes/student.js
const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

// POST: add new student
//http://localhost:7777/student/add-student

/*
 {
    "student_id": 5,
    "roll_number": 110,
    "prn_number": 500010,
    "group_id": 3,
    "user_id": 5,
    "created_at": "2025-08-14",
    "updated_at": "2025-08-14"
  }    
*/

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
