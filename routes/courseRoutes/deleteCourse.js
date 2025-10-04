const express = require("express");

const router = express.Router();


const { errorResponse, successResponse } = require("../../utils/apiResponse");

// DELETE: delete an user
//http://localhost:7777/course/delete-course/7

router.delete("/delete-course/:courseId", (req, res) => {
  let { courseId } = req.params;
  
  courseId = Number.parseInt(courseId);
  if (Number.isNaN(courseId) || courseId < 0) {
    return res.status(400).send(errorResponse("Invalid course Id"))
  }

  const sql = `DELETE FROM ${COURSE_TABLE}
                WHERE course_id = ?`;
  pool.query(sql, [courseId], (error, result) => {
    if (error) {
      return res.status(500).send(errorResponse(error));
    }
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).send(errorResponse("No course Found with ID: " + courseId));
    }
    return res.status(200).send(successResponse(
      " Course DELETED Successfully with ID: " + courseId));
  });
});

module.exports = router;
