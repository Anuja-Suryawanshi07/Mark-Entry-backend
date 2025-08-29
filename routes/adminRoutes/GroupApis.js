const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_GROUP_TABLE, COURSE_TABLE } = require("../../config");

// GET all student groups

// http://localhost:7777/admin/get-all-group

router.get("/get-all-groups", (req, res) => {

  const sql = `SELECT * FROM \`${STUDENT_GROUP_TABLE}\``;

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

//addGroupByCourse
//http://localhost:7777/admin/add-student-group
router.post("/add-student-group", (req, res) => {
  const { group_name, course_id } = req.body;

  if (!group_name || !course_id) {
    return res.status(400).send(errorResponse("Group name and Course ID are required"));
  }

  const checkCourseSql = `SELECT * FROM \`${COURSE_TABLE}\` WHERE course_id = ?`;

  pool.query(checkCourseSql, [course_id], (err, courseResults) => {
    if (err) {
      return res.status(500).send(errorResponse(err.message));
    }

    if (courseResults.length === 0) {
      return res.status(400).send(errorResponse("Invalid course_id. Course does not exist."));
    }

    const insertSql = `INSERT INTO \`${STUDENT_GROUP_TABLE}\` (group_name, course_id) VALUES (?, ?)`;

    pool.query(insertSql, [group_name, course_id], (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error.message));
      }
      return res.status(201).send(
        successResponse(`Student group added successfully with ID: ${result.insertId}`)
      );
    });
  });
});

//http://localhost:7777/admin/update-group/3
router.put("/update-group/:groupId", (req, res) => {
  const { groupId } = req.params;
  const { group_name, course_id } = req.body;

  if (!group_name || !course_id) {
    return res.status(400).send(errorResponse("Group name and Course ID are required"));
  }

  // Step 1: Check if course exists
  const checkCourseSql = `SELECT course_id FROM ${COURSE_TABLE} WHERE course_id = ?`;
  pool.query(checkCourseSql, [course_id], (err, courseResult) => {
    if (err) return res.status(500).send(errorResponse(err.message));

    if (courseResult.length === 0) {
      return res.status(400).send(errorResponse(`Course with ID ${course_id} does not exist`));
    }

  
    const updateSql = `
      UPDATE \`${STUDENT_GROUP_TABLE}\`
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

//http://localhost:7777/admin/delete-group/6
router.delete("/delete-group/:groupId", (req, res) => {
  const { groupId } = req.params;

  const deleteSql = `DELETE FROM \`${ STUDENT_GROUP_TABLE}\` WHERE group_id = ?`;

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
