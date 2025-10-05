const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MARKS_TABLE } = require("../../config");

// GET all Marks

//http://localhost:7777/marks/all-marks

router.get("/all-marks", (req, res) => {
  const sql = `SELECT * FROM ${MARKS_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No Marks."));
    }
    return res.send(successResponse(results));
  });
});

module.exports = router;
