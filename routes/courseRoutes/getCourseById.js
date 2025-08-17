const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { COURSE_TABLE } = require("../../config");
const { successResponse, errorResponse } = require("../../utils/apiResponse");



// GET: get an user by Id
//http://localhost:7777/course/get-course/7

router.get("/get-course/:courseId", (req, res) => {
  const { courseId } = req.params;


  courseId = Number.parseInt(courseId);
  if (Number.isNaN(courseId) || courseId < 0) {
    return res.status(400).send(errorResponse("Invalid course Id"))
  }


  const sql = `SELECT * FROM ${COURSE_TABLE} WHERE course_id = ?`;

  pool.query(
    sql,
    [courseId],
    (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      console.log("result: ", result);

      if (result.length === 0) {
        return res.status(404).send(errorResponse("No Course found with this ID: " + courseId));
      }
      return res.status(200).send(successResponse(result[0]));
    }
  );
});

module.exports = router;