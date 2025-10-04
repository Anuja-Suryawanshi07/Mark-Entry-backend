const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STAFF_TABLE, COURSE_TABLE } = require("../../config");

// GET all Staff with optional filters
// Examples:
//   GET /staff/all-staff                          → all staff
//   GET /staff/all-staff?course_id=1              → staff of course 1
//   GET /staff/all-staff?batch_id=2               → staff of batch 2
//   GET /staff/all-staff?batch_id=2&course_id=1   → staff of batch 2 AND course 1

router.get("/all-staff", (req, res) => {
  const { batch_id, course_id } = req.query;

  let sql = `
    SELECT 
      st.staff_id,
      st.staff_name,
      st.user_id,
      st.role_id,
      st.course_id,
      c.batch_id,
      c.course_name
    FROM ${STAFF_TABLE} st
    INNER JOIN ${COURSE_TABLE} c ON st.course_id = c.course_id
    WHERE 1=1
  `;

  const params = [];

  if (course_id) {
    sql += " AND st.course_id = ?";
    params.push(course_id);
  }

  if (batch_id) {
    sql += " AND c.batch_id = ?";
    params.push(batch_id);
  }

  sql += " ORDER BY st.staff_id";

  pool.query(sql, params, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No staff found with given filters."));
    }

    return res.send(successResponse(results));
  });
});

module.exports = router;
