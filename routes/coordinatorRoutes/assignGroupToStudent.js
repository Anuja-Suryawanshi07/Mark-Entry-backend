const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");


// PUT /assign-group-to-student
//http://localhost:7777/coordinator/assign-group-to-student
/*
  {
  "studentId": 14,
  "groupName": "W3"
  }
 */

router.put("/assign-group-to-student", async (req, res) => {
  const {
    studentId,
    // groupId,
    groupName,
  } = req.body;

  if (!studentId || !groupName) {
    return res
      .status(400)
      .json(errorResponse("Missing studentId or groupName in request body."));
  }

  try {
    // Optional: check if student exists
    const [studentRows] = await pool
      .promise()
      .query(`SELECT * FROM ${STUDENT_TABLE} WHERE student_id = ?`, [
        studentId,
      ]);

    if (studentRows.length === 0) {
      return res.status(404).json(errorResponse("Student not found."));
    }

    // Optional: check if group exists
    // const [groupRows] = await pool.promise().query(
    //   `SELECT * FROM ${STUDENT_GROUP_TABLE} WHERE group_id = ?`,
    //   [groupId]
    // );
    const [groupRows] = await pool
      .promise()
      .query(
        `SELECT group_id FROM ${STUDENT_GROUP_TABLE} WHERE group_name = ?`,
        [groupName]
      );

    if (groupRows.length === 0) {
      return res.status(404).json(errorResponse("Group not found."));
    }

    // Update student's group_id
    await pool
      .promise()
      .query(`UPDATE ${STUDENT_TABLE} SET group_id = ? WHERE student_id = ?`, [
        // groupId,
        groupRows[0].group_id,
        studentId,
      ]);

    return res
      .status(200)
      .json(successResponse("Group assigned to student successfully."));
  } catch (error) {
    console.error("Error assigning group:", error);
    return res
      .status(500)
      .json(errorResponse("Failed to assign group to student.", error));
  }
});

module.exports = router;

