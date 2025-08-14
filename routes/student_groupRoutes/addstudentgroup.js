const express = require('express');
const router = express.Router();

const pool = require('../../config/db');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

// Your existing route here:

//http://localhost:7777/student-groups/add-student-group
/*
  {
    "group_id": 11,
    "group_name": "W3",
    "course_id": 4
  }
*/
router.post("/add-student-group", (req, res) => {
  const { group_name, course_id } = req.body;

  if (!group_name || !course_id) {
    return res.status(400).send(errorResponse("Group name and Course ID are required"));
  }

  const checkCourseSql = `SELECT * FROM course WHERE course_id = ?`;

  pool.query(checkCourseSql, [course_id], (err, courseResults) => {
    if (err) {
      return res.status(500).send(errorResponse(err.message));
    }

    if (courseResults.length === 0) {
      return res.status(400).send(errorResponse("Invalid course_id. Course does not exist."));
    }

    const insertSql = `INSERT INTO student_group (group_name, course_id) VALUES (?, ?)`;

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

module.exports = router;
