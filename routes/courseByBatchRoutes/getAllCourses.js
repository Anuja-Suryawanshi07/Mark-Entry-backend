// routes/courseByBatchRoutes/getCourseByBatch.js
const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { COURSE_TABLE, BATCH_TABLE } = require("../../config");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// GET courses by batchId (only for active batches)
// Example: http://localhost:7777/course/get-course-by-batch/2
router.get("/get-course-by-batch/:batchId", (req, res) => {
  let { batchId } = req.params;

  batchId = Number.parseInt(batchId);
  if (Number.isNaN(batchId) || batchId < 0) {
    return res.status(400).send(errorResponse("Invalid batch Id"));
  }

  // Step 1: Check if batch exists and is active
  const batchSql = `SELECT * FROM ${BATCH_TABLE} WHERE batch_id = ? AND is_active = 1`;

  pool.query(batchSql, [batchId], (batchErr, batchResult) => {
    if (batchErr) return res.status(500).send(errorResponse(batchErr.message));

    if (batchResult.length === 0) {
      return res
        .status(404)
        .send(errorResponse("No active batch found with ID: " + batchId));
    }

    // Step 2: Get all courses for this active batch
    const courseSql = `SELECT * FROM ${COURSE_TABLE} WHERE batch_id = ?`;

    pool.query(courseSql, [batchId], (courseErr, courseResult) => {
      if (courseErr) return res.status(500).send(errorResponse(courseErr.message));

      if (courseResult.length === 0) {
        return res
          .status(404)
          .send(errorResponse("No courses found for batch ID: " + batchId));
      }

      // Step 3: Merge batch info into each course object
      const activeBatch = batchResult[0];
      const finalResult = courseResult.map((course) => ({
        course_id: course.course_id,
        course_name: course.course_name,
        batch_id: activeBatch.batch_id,
        batch_name: activeBatch.batch_name,
        is_active: activeBatch.is_active,
      }));

      return res.status(200).send(successResponse(finalResult));
    });
  });
});

module.exports = router;
