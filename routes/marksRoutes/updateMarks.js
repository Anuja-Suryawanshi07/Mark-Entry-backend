const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


// PUT: update marks by Id
// http://localhost:7777/marks/update-marks/6

router.put("/update-marks/:markId", (req, res) => {
  const { markId } = req.params;
  const { studentId, staffId, moduleId, theoryMarks, labMarks, IA1, IA2, startdate, tilldate, status } = req.body;

  const sql = `UPDATE ${MARKS_TABLE}
                 SET student_id = ?, staff_id = ?, module_id = ?, theory_marks = ?, lab_marks = ?, IA_1 = ?, IA_2 = ?, start_date = ?, till_date = ?, status = ?
                 WHERE mark_id = ?`;

  pool.query(
    sql,
    [studentId, staffId, moduleId, theoryMarks, labMarks, IA1, IA2, startdate, tilldate, status, markId],
    (error, result) => {
      if (error) {
        return res.send(errorResponse(error));
      }

      if (result.affectedRows === 0) {
        return res.send({
          status: "Error",
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
