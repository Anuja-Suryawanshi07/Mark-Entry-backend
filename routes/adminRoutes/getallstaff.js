const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STAFF_TABLE } = require("../../config");

// GET all Staff

//http://localhost:7777/admin/all-staff

router.get("/all-staff", (req, res) => {
  const sql = `SELECT * FROM ${STAFF_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No Such Staff."));
    }
    return res.send(successResponse(results));
  });
});

module.exports = router;

