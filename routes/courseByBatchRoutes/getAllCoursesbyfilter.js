const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


// GET all Courses OR filter by batch_id / course_name / both
// Examples:
//   http://localhost:7777/course/all-courses-by-filter
//   http://localhost:7777/course/all-courses-by-filter?batch_id=2
//   http://localhost:7777/course/all-courses-by-filter?course_name=PG-DAC
//   http://localhost:7777/course/all-courses-by-filter?batch_id=2&course_name=PG-DAC

router.get("/all-courses-by-filter", (req, res) => {
  const { batch_id, course_name } = req.query;

  let sql = `SELECT * FROM ${COURSE_TABLE}`;
  let conditions = [];
  let values = [];

  if (batch_id) {
    conditions.push("batch_id = ?");
    values.push(batch_id);
  }

  if (course_name) {
    conditions.push("course_name = ?");
    values.push(course_name);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  pool.query(sql, values, (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.status(404).send(errorResponse("No Such Course."));
    }

    return res.status(200).send(successResponse(results));
  });
});

module.exports = router;
