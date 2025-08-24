const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { COURSE_TABLE } = require("../../config");

// GET all Courses

//http://localhost:7777/admin/all-courses

router.get("/all-courses", (req, res) => {
  const sql = `SELECT * FROM ${COURSE_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No Such Course."));
    }
    return res.send(successResponse(results));
  });
});

module.exports = router;

