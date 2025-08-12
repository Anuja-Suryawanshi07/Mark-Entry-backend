const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MARKS_TABLE } = require("../../config");

// PUT: update an marks by Id

//http://localhost:7777/marks/update-marks/6

router.put("/update-marks/:mark_Id", (req, res) => {
  const { mark_Id } = req.params;
  const { markId, studentId, moduleId, labTestMarks, mcqMarks, assignmentMarks, totalMarks, examDate } = req.body;
const sql = `UPDATE ${ MARKS_TABLE }
                SET mark_id = ?, student_id = ?, module_id = ?, lab_test_marks = ?, mcq_marks = ?, assignment_marks = ?, total_marks = ?, exam_date = ?
                WHERE mark_id = ?`;

    pool.query(
    sql,
    [markId, studentId, moduleId, labTestMarks, mcqMarks, assignmentMarks, totalMarks, examDate, mark_Id ],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      console.log("result: ", result);

      if (result.affectedRows === 0) {
        return res.send({
          status: "Success",
          message: "No Marks found with this ID: " + markId,
        });
      }
      return res.send({
        status: "Success",
        message: "Marks updated Successfully with ID: " + markId,
      });
    }
  );
});

module.exports = router;            

