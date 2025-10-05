const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_TABLE } = require("../../config");

router.put("/update-student-status/:studentId", (req, res) => {
  const { studentId } = req.params;
  const { isActive } = req.body;

  const sql = `UPDATE ${STUDENT_TABLE} SET is_active = ? WHERE student_id = ?`;

  pool.query(sql, [isActive, studentId], (error, result) => {
    if (error) {
      // return res.send(error)
      return res
        .status(500)
        .json(errorResponse("An error occurred while updating the student status."));
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(errorResponse("No student found with the given ID."));
    }

    return res.status(200).json(
      successResponse({
        message: "Student Status updated successfully.",
        studentId: studentId,
      })
    );
  });
});

module.exports = router;
