const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const {
  MARKS_TABLE,
  STUDENT_GROUP_TABLE,
  MODULE_TABLE,
  USER_TABLE,
  STAFF_TABLE,
  STUDENT_TABLE,
} = require("../../config");

// GET: All pending marks (no staff filter)
router.get("/pending", async (req, res) => {
  try {
    const query = `SELECT staff_table.staff_name, student_table.student_name, student_group_table.group_name, module_table.module_name, mark_table.theory_marks,mark_table.lab_marks, mark_table.IA_1, mark_table.IA_2, mark_table.start_date, mark_table.till_date, mark_table.status FROM ${MARKS_TABLE} mark_table JOIN ${STAFF_TABLE} staff_table ON staff_table.staff_id = mark_table.staff_id JOIN ${STUDENT_TABLE} student_table ON student_table.student_id = mark_table.student_id JOIN ${STUDENT_GROUP_TABLE} student_group_table ON student_group_table.group_id = student_table.group_id JOIN ${MODULE_TABLE} module_table ON module_table.module_id = mark_table.module_id WHERE mark_table.status = 'Pending'`;

    pool.execute(query, (error, results) => {
      if (error) {
        console.error("Database Error:", error);
        return res.status(500).json(errorResponse("Database Error", error));
      }

      if (results.length === 0) {
        return res.status(404).json(errorResponse("No pending records found."));
      }

      return res
        .status(200)
        .json(successResponse(results, "Pending marks fetched successfully."));
    });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).json(errorResponse("Internal Server Error"));
  }
});

module.exports = router;
