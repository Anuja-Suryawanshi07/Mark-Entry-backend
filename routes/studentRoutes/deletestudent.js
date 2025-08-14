const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { STUDENT_TABLE } = require("../../config"); // Make sure STUDENT_TABLE = 'student' in config

// DELETE: delete a student
// http://localhost:7777/student/delete-student/6

router.delete("/delete-student/:studentId", (req, res) => {
  const { studentId } = req.params;

  const sql = `DELETE FROM ${STUDENT_TABLE} WHERE student_id = ?`;

  pool.query(sql, [studentId], (error, result) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        error,
      });
    }

    if (result.affectedRows === 0) {
      return res.send({
        status: "Success",
        message: "No Student Found with ID: " + studentId,
      });
    }

    return res.send({
      status: "Success",
      message: "Student DELETED Successfully with ID: " + studentId,
    });
  });
});

module.exports = router;
