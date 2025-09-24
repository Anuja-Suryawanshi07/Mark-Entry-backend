const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { COURSE_TABLE, BATCH_TABLE } = require("../../config");

router.get("/all-courses", (req, res) => {
  const sql = `select c.course_id, b.batch_name, c.course_name from ${BATCH_TABLE} b 
  join ${COURSE_TABLE} c on b.batch_id = c.batch_id;`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error)); // 500 means vo jiska reason apne ko pata nahi
    }

    if (results.length === 0) {
      return res.status(404).send(errorResponse("No Such Course.")); // 404 means not found
    }
    return res.status(200).send(successResponse(results)); // 200 means success 
  });
});


module.exports = router;