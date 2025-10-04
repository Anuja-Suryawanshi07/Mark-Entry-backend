const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


// PUT: update a student by Id
//http://localhost:7777/admin/add-student-to-group

// {
//     "student_id":1,
//     "group_id":1 
// }
router.put("/add-student-to-group", (req, res) => {

  let { student_id, group_id } = req.body;

  if ( !student_id || !group_id) {
    return res.send(errorResponse("All fields are required"));
  }


    group_id = Number.parseInt(group_id);
    if (Number.isNaN(group_id) || group_id < 0) {
        return res.status(400).send(errorResponse("Invalid group Id"))
    }

    student_id = Number.parseInt(student_id);
    if (Number.isNaN(student_id) || student_id < 0) {
        return res.status(400).send(errorResponse("Invalid role Id"))
    }                 
  

    // Update student record
    const updateSql = `
      UPDATE ${STUDENT_TABLE}
      SET group_id = ?
      WHERE student_id = ?
    `;

    pool.query(updateSql, [group_id, student_id], (error, result) => {
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
