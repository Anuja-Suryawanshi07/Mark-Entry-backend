const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { COURSE_TABLE } = require("../../config");
const { successResponse, errorResponse } = require("../../utils/apiResponse");



// PUT: update an user by Id
//http://localhost:7777/course/update-course/7

router.put("/update-course/:courseId", (req, res) => {
  const { courseId } = req.params;
  const { course_name, batch_id } = req.body;


  courseId = Number.parseInt(courseId);
  if (Number.isNaN(courseId) || courseId < 0) {
    return res.status(400).send(errorResponse("Invalid course Id"))
  }


  if (typeof course_name !== "string" || course_name === "") {
    return res.status(400).json(errorResponse("invalid course name"))
  }

  batch_id = Number.parseInt(batch_id);
  if (Number.isNaN(batch_id) || batch_id < 0) {
    return res.status(400).send(errorResponse("Invalid Batch Id"))
  }
  
  const sql = `UPDATE ${COURSE_TABLE}
                SET  course_name = ?, batch_id = ?
                WHERE course_id = ?`;

  pool.query(
    sql,
    [course_name, batch_id, courseId],
    (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      console.log("result: ", result);

      if (result.affectedRows === 0) {
        return res.status(404).send(errorResponse("No Course found with this ID: " + courseId));
      }
      return res.status(200).send(successResponse("Course details updated Successfully with ID: " + courseId));
    }
  );
});

module.exports = router;