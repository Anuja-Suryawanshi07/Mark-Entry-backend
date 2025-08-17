const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_TABLE } = require("../../config");

// GET all students
// http://localhost:7777/admin/all-students

router.get("/all-students", (req, res) => {
  const sql = `SELECT * FROM ${STUDENT_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No students found."));
    }
    return res.send(successResponse(results));
  });
});

module.exports = router;
