const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


// PUT: update a student by Id
//http://localhost:7777/student/update-student/5

router.put("/update-student/:studentId", (req, res) => {
  const { studentId } = req.params;
  const { prn_number, student_name, group_id, user_id } = req.body;

  if (!prn_number  ||!student_name || !group_id || !user_id) {
    return res.send(errorResponse("All fields are required"));
  }

  // Step 1: Check if user exists
  const checkUserSql = `SELECT user_id FROM ${USER_TABLE} WHERE user_id = ?`;
  pool.query(checkUserSql, [user_id], (err, userResult) => {
    if (err) return res.send(errorResponse(err));

    if (userResult.length === 0) {
      return res.send(errorResponse(`User with ID ${user_id} does not exist`));
    }

    // Step 2: Update student record
    const updateSql = `
      UPDATE ${STUDENT_TABLE}
      SET prn_number = ?, student_name = ?, group_id = ?, user_id = ?, updated_at = CURDATE()
      WHERE student_id = ?
    `;

    pool.query(updateSql, [ prn_number, student_name, group_id, user_id, studentId], (error, result) => {
      if (error) {
        return res.send(errorResponse(error));
      }

      if (result.affectedRows === 0) {
        return res.send(errorResponse(`No Student found with this ID: ${studentId}`));
      }

      return res.send(successResponse(`Student details updated successfully with ID: ${studentId}`));
    });
  });
});

module.exports = router;
