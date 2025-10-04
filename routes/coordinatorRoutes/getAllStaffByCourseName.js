const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");


// Get all staffs by course name
router.get("/all-staff-with-course", (req, res) => {
  const { courseName } = req.query;

  if (!courseName) {
    return res.status(400).json(errorResponse("Query parameter 'courseName' is required."));
  }

  const sql = `
    SELECT staff_table.*, course_table.*, user_table.* FROM ${STAFF_TABLE} staff_table JOIN ${COURSE_TABLE} course_table ON staff_table.course_id = course_table.course_id JOIN ${USER_TABLE} user_table ON staff_table.user_id = user_table.user_id WHERE course_table.course_name = ?;
  `;

  pool.query(sql, [courseName], (error, results) => {
    if (error) {
      return res.status(500).json(errorResponse("Database query failed.", error));
    }

    if (results.length === 0) {
      return res.status(200).json(successResponse("No staffs found for the given course."));
    }

    return res.status(200).json(successResponse(results));
  });
});

module.exports = router;

