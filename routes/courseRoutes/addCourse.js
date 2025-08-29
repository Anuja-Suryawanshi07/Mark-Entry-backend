const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { COURSE_TABLE } = require("../../config");


// POST: add new course
//http://localhost:7777/course/add-course

// {
//   "course_name": "DBDA",
//   "batch_id": 1
// }

router.post("/add-course", (req, res) => {

  let { course_name, batch_id } = req.body;

  if (typeof course_name !== "string" || course_name === "") {
    return res.status(400).json(errorResponse("Invalid course name"))
  }

  batch_id = Number.parseInt(batch_id);
  if (Number.isNaN(batch_id) || batch_id < 0) {
    return res.status(400).send(errorResponse("Invalid Batch Id"))// 400 means client ne bad request send ki ex. batch_id client ne number send krna chahiye , string or other type beje to allow nahi karenga
  }


  const sql = `INSERT INTO ${COURSE_TABLE} (  course_name, batch_id ) VALUES (?, ?)`;

  pool.query(
    sql, [course_name, batch_id], (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      return res.status(201).send(
        successResponse( "Course added Successfully with ID: " + result.insertId)
      );
    }
  );
});

module.exports = router;