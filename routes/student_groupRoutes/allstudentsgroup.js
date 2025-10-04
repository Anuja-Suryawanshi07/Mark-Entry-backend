const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// GET all student groups

// http://localhost:7777/student-groups/get-all-groups

router.get("/get-all-groups", (req, res) => {

  const sql = `SELECT * FROM ${ STUDENT_GROUP_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error.message));
    }

    if (results.length === 0) {
      return res.send(successResponse("No student groups found."));
    }

    return res.send(successResponse(results));
  });
});

module.exports = router;
