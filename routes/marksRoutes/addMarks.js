const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MARKS_TABLE } = require("../../config");

// POST: add marks

//http://localhost:7777/marks/add-marks

router.post("/add-marks", (req,res) => {
    const { markId, studentId, moduleId, labTestMarks, mcqMarks, assignmentMarks, totalMarks, examDate } = req.body;

    const sql = `INSERT INTO ${ MARKS_TABLE } ( mark_id, student_id, module_id, lab_test_marks, mcq_marks, assignment_marks, total_marks, exam_date ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )`;
 pool.query(
    sql,
    [markId, studentId, moduleId, labTestMarks, mcqMarks, assignmentMarks, totalMarks, examDate],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      return res.status(201).send({
        status: " Success",
        message: "Marks added Successfully with ID: " + result.insertId,
      });
    }
  );
});

module.exports = router;

