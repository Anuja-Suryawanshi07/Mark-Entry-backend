const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { COURSE_TABLE } = require("../../config");


// POST: add new course
//http://localhost:7777/course/add-course

//  {
//             "course_id": 1,
//             "course_name": "DMC",
//             "batch_id": 1
//         },
        // {
           
        //     "course_name": "DBDA",
        //     "batch_id": 1
        // }

router.post("/add-course", (req, res) => {
  
  const { course_name, batch_id } = req.body;
  
  if(typeof course_name !== "string" || course_name=== ""){
    return res.status(400).json({message:"invalid course name"})
  }

  const sql = `INSERT INTO ${ COURSE_TABLE } (  course_name, batch_id ) VALUES (?, ?)`;

  pool.query(
    sql,
    [course_name, batch_id],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      return res.status(201).send({
        status: " Success",
        message: "Course added Successfully with ID: " + result.insertId,
      });
    }
  );
});

module.exports = router;