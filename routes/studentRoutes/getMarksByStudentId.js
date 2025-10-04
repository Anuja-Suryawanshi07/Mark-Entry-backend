const express = require("express");

const router = express.Router();
const { STUDENT_TABLE } = require("../../config");

// GET marks of a student by studentId
// http://localhost:7777/student/marks/:studentId

router.get("/marks", (req, res) => {
  const  studentId  = req.user.student_id;
  if (!studentId) {
    return res
      .status(400)
      .json({ status: "Error", message: "Student ID is required" });
  }

  const sql = `
  SELECT 
    CONCAT(u.first_name, ' ', u.last_name) AS student_name,
    g.group_name,
    modu.module_name,
    m.theory_marks,
    m.lab_marks,
    m.IA_1,
    m.IA_2
  FROM ${STUDENT_TABLE} AS s
  LEFT JOIN user AS u ON s.user_id = u.user_id
  LEFT JOIN student_group AS g ON s.group_id = g.group_id
  LEFT JOIN marks AS m ON s.student_id = m.student_id
  LEFT JOIN module AS modu ON m.module_id = modu.module_id
  WHERE s.student_id = ?`;

  /*On Frontend we are showing Student Name, Group Name, Module Name,Theory,Lab, IA-1, IA-2
    so Changes made accordingly */
   
    //Run this query if we want to add total marks column in frontend

   /*const sql = `
  SELECT 
    CONCAT(u.first_name, ' ', u.last_name) AS student_name,
    g.group_name,
    SUM(m.theory_marks) AS total_theory_marks,
    SUM(m.lab_marks) AS total_lab_marks,
    SUM(m.IA_1) AS total_IA1,
    SUM(m.IA_2) AS total_IA2,
    SUM(m.theory_marks + m.lab_marks + m.IA_1 + m.IA_2) AS grand_total
  FROM ${STUDENT_TABLE} AS s
  LEFT JOIN user AS u ON s.user_id = u.user_id
  LEFT JOIN student_group AS g ON s.group_id = g.group_id
  LEFT JOIN marks AS m ON s.student_id = m.student_id
  LEFT JOIN module AS mod_table ON m.module_id = mod_table.module_id
  WHERE s.student_id = ?
  GROUP BY s.student_id, u.first_name, u.last_name, g.group_name`;
 */ 

  pool.query(sql, [studentId], (err, result) => {
    if (err)
      return res.status(500).json({ status: "Error", message: err.message });
    if (result.length === 0)
      return res
        .status(404)
        .json({ status: "Error", message: "Student not found" });

    return res.status(200).json({ status: "Success", data: result });
  });
});

module.exports = router;
