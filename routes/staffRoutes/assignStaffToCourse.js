const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STAFF_TABLE, COURSE_TABLE } = require("../../config");

/*
 * PUT: Assign / Update Staff Course
 * URL: http://localhost:7777/staff/assign-course/:staff_id
 * Body:
 *   {
 *     "course_id": 2
 *   }
 */

router.put("/assign-course/:staff_id", (req, res) => {
  const { staff_id } = req.params;
  const { course_id } = req.body;

  if (!course_id) {
    return res.send(errorResponse("course_id is required."));
  }

  // Validate if course exists
  const checkCourseSql = `SELECT * FROM ${COURSE_TABLE} WHERE course_id = ?`;

  pool.query(checkCourseSql, [course_id], (courseErr, courseResult) => {
    if (courseErr) {
      return res.send(errorResponse(courseErr));
    }

    if (courseResult.length === 0) {
      return res.send(errorResponse("Invalid course_id. Course not found."));
    }

    // Update staff record with new course
    const updateSql = `UPDATE ${STAFF_TABLE} SET course_id = ? WHERE staff_id = ?`;

    pool.query(updateSql, [course_id, staff_id], (updateErr, updateResult) => {
      if (updateErr) {
        return res.send(errorResponse(updateErr));
      }

      if (updateResult.affectedRows === 0) {
        return res.send(errorResponse("Staff not found or no update made."));
      }

      return res.send(successResponse(`Staff ${staff_id} assigned to course ${course_id} successfully.`));
    });
  });
});

module.exports = router;
