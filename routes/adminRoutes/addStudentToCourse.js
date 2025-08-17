const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_TABLE } = require("../../config");

// PUT: update a student by Id
//http://localhost:7777/student/update-student/5

router.put("/add-student-to-course", (req, res) => {

  let { student_id, course_id } = req.body;

  if ( !student_id || !course_id) {
    return res.send(errorResponse("All fields are required"));
  }


    course_id = Number.parseInt(course_id);
    if (Number.isNaN(course_id) || course_id < 0) {
        return res.status(400).send(errorResponse("Invalid course Id"))
    }

    student_id = Number.parseInt(student_id);
    if (Number.isNaN(student_id) || student_id < 0) {
        return res.status(400).send(errorResponse("Invalid role Id"))
    }                 
  

    // Update student record
    const updateSql = `
      UPDATE ${STUDENT_TABLE}
      SET course_id = ?
      WHERE student_id = ?
    `;

    pool.query(updateSql, [course_id, student_id], (error, result) => {
      if (error) {
        return res.send(errorResponse(error));
      }

      if (result.affectedRows === 0) {
        return res.send(errorResponse(`No Student found with this ID: ${student_id}`));
      }

      return res.send(successResponse(`Student details updated successfully with ID: ${student_id}`));
    });
  
});

module.exports = router;
