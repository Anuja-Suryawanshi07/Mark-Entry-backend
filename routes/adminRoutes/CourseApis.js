const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { COURSE_TABLE, BATCH_TABLE } = require("../../config");


// GET all Courses
//http://localhost:7777/admin/all-courses

router.get("/all-courses", (req, res) => {
  const sql = `select c.course_id, b.batch_name, c.course_name from ${BATCH_TABLE} b 
  join ${COURSE_TABLE} c on b.batch_id = c.batch_id;`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error)); // 500 means vo jiska reason apne ko pata nahi
    }

    if (results.length === 0) {
      return res.status(404).send(errorResponse("No Such Course.")); // 404 means not found
    }
    return res.status(200).send(successResponse(results)); // 200 means success 
  });
});

//http://localhost:7777/admin/add-course
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

// http://localhost:7777/admin/update-course/4
router.put("/update-course/:courseId", (req, res) => {
  let { courseId } = req.params;
  let { course_name } = req.body;


  courseId = Number.parseInt(courseId);
  if (Number.isNaN(courseId) || courseId < 0) {
    return res.status(400).send(errorResponse("Invalid course Id"))
  }


  if (typeof course_name !== "string" || course_name === "") {
    return res.status(400).json(errorResponse("invalid course name"))
  }

  // batch_id = Number.parseInt(batch_id);
  // if (Number.isNaN(batch_id) || batch_id < 0) {
  //   return res.status(400).send(errorResponse("Invalid Batch Id"))
  // }
  
  const sql = `UPDATE ${COURSE_TABLE}
                SET  course_name = ? 
                WHERE course_id = ?`;

  pool.query(
    sql,
    [course_name,  courseId],
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

//http://localhost:7777/admin/delete-course/10
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