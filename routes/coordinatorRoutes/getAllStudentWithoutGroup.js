const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const {
  STUDENT_TABLE,
  STUDENT_GROUP_TABLE,
  USER_TABLE,
  COURSE_TABLE,
} = require("../../config");

// Get all students without a group
//http://localhost:7777/coordinator/students-without-group

// router.get("/students-without-group", async (req, res) => {
//   try {
//     const [results] = await pool.promise().query(
//       `SELECT student_table.*, user_table.email, user_table.mobile_number
//       FROM ${STUDENT_TABLE} AS student_table
//       JOIN ${USER_TABLE} AS user_table ON student_table.user_id = user_table.user_id WHERE student_table.group_id IS NULL`
//     );

//     if (results.length === 0) {
//       return res
//         .status(200)
//         .json(successResponse("No students found without a group."));
//     }

//     return res.status(200).json(successResponse(results));
//   } catch (error) {
//     console.error("Error fetching students without group:", error);
//     return res.status(500).json(errorResponse("Database query failed.", error));
//   }
// });

router.get("/students-without-group", (req, res) => {
  const { courseName } = req.query;

  if (!courseName) {
    return res
      .status(400)
      .json(errorResponse("Query parameter 'courseName' is required."));
  }

  //   if (!courseName || courseName.trim() === "") {
  //   return res.status(400).json(errorResponse("Query parameter 'courseName' is required."));
  // }

  const sql = `
    SELECT student.*, course.*
    FROM ${STUDENT_TABLE} student
    JOIN ${COURSE_TABLE} course ON student.course_id = course.course_id
    WHERE student.group_id IS NULL
      AND course.course_name = ?;
  `;

  pool.query(sql, [courseName], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json(errorResponse("Database query failed.", error));
    }

    if (results.length === 0) {
      return res
        .status(200)
        .json(successResponse("No students found without a group."));
    }

    return res.status(200).json(successResponse(results));
  });
});

module.exports = router;
