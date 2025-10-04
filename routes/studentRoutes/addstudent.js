// routes/student.js
const express = require("express");

const router = express.Router();
const { STUDENT_TABLE } = require("../../config");

// POST: add new student
//http://localhost:7777/student/add-student

/*
{
    "student_id": 11,
    "prn_number": 500015,
    "student_name": "Neha Jain",
    "group_id": 3,
    "user_id": 5
  }    
*/

router.post("/add-student", (req, res) => {
  const { student_id, prn_number, student_name, group_id, user_id } = req.body;

  
   const sql = `
  INSERT INTO ${STUDENT_TABLE}
  (student_id, prn_number, student_name, group_id, user_id, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, CURDATE(), CURDATE())
`;


  pool.query(
    sql,
    [ student_id, prn_number, student_name, group_id, user_id],
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
