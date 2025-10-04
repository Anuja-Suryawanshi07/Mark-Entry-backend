const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// PUT: update a student group by group_id

// Example: PUT http://localhost:7777/student-groups/update-group/11


router.put("/update-group/:groupId", (req, res) => {
  const { groupId } = req.params;
  const { group_name, course_id } = req.body;

  if (!group_name || !course_id) {
    return res.status(400).send(errorResponse("Group name and Course ID are required"));
  }

  // Step 1: Check if course exists
  const checkCourseSql = `SELECT course_id FROM course WHERE course_id = ?`;
  pool.query(checkCourseSql, [course_id], (err, courseResult) => {
    if (err) return res.status(500).send(errorResponse(err.message));

    if (courseResult.length === 0) {
      return res.status(400).send(errorResponse(`Course with ID ${course_id} does not exist`));
    }

    // Step 2: Update student_group record
    const updateSql = `
      UPDATE ${ STUDENT_GROUP_TABLE}
      SET group_name = ?, course_id = ?
      WHERE group_id = ?
    `;

    pool.query(updateSql, [group_name, course_id, groupId], (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error.message));
      }

      if (result.affectedRows === 0) {
        return res.status(404).send(errorResponse(`No student group found with ID: ${groupId}`));
      }

      return res.send(successResponse(`Student group updated successfully with ID: ${groupId}`));
    });
  });
});

module.exports = router;
