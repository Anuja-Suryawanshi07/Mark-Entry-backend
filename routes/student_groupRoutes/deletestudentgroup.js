const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_GROUP_TABLE } = require("../../config");

// DELETE: delete a student group by group_id
// http://localhost:7777/student-groups/delete-group/11

router.delete("/delete-group/:groupId", (req, res) => {
  const { groupId } = req.params;

  const deleteSql = `DELETE FROM ${ STUDENT_GROUP_TABLE} WHERE group_id = ?`;

  pool.query(deleteSql, [groupId], (error, result) => {
    if (error) {
      return res.status(500).send(errorResponse(error.message));
    }

    if (result.affectedRows === 0) {
      return res.status(404).send(errorResponse(`No student group found with ID: ${groupId}`));
    }

    return res.send(successResponse(`Student group deleted successfully with ID: ${groupId}`));
  });
});

module.exports = router;
