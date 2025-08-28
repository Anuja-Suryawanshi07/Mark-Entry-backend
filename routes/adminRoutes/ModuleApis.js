const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MODULE_TABLE, COURSE_TABLE } = require("../../config");


// GET all users
//http://localhost:7777/module/all-modules

router.get("/all-modules", (req, res) => {
  const sql = `select m.module_id, c.course_name, m.module_name from ${MODULE_TABLE} m 
  join ${COURSE_TABLE} c on m.course_id = c.course_id;`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error)); // 500 means vo jiska reason apne ko pata nahi
    }

    if (results.length === 0) {
      return res.status(404).send(errorResponse("No Such Module.")); // 404 means not found
    }
    return res.status(200).send(successResponse(results)); // 200 means success 
  });
});

//getModuleByCourseId
//http://localhost:7777/admin/all/course/2
router.get("/all/course/:courseId", (req, res) => {
  let { courseId } = req.params;
 
  courseId = Number.parseInt(courseId);
  if (Number.isNaN(courseId) || courseId < 0) {
    return res.status(400).send(errorResponse("Invalid course Id"))
  }

  const sql = `SELECT * FROM ${MODULE_TABLE} WHERE course_id = ?`;

  pool.query(
    sql,
    [courseId],
    (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      console.log("result: ", result);

      if (result.length === 0) {
        return res.status(404).send(errorResponse("No Module found with this ID: " + courseId));
      }
      return res.status(200).send(successResponse(result));
    }
  );
});

//http://localhost:7777/admin/add-module
router.post("/add-module", (req, res) => {
  let { module_name, course_id } = req.body;

  if (typeof module_name !== "string" || module_name === "") {
    return res.status(400).json(errorResponse("Invalid Module Name"))
  }

  course_id = Number.parseInt(course_id);
  if (Number.isNaN(course_id) || course_id < 0) {
    return res.status(400).send(errorResponse("Invalid Course Id"))
  }

  
  const checkCourseSql = `SELECT * FROM course WHERE course_id = ?`;

  pool.query(checkCourseSql, [course_id], (err, courseResults) => {
    if (err) {
      return res.status(500).send(errorResponse(err.message));
    }

    if (courseResults.length === 0) {
      return res.status(400).send(errorResponse("Invalid course_id. Course does not exist."));
    }

  const sql = `INSERT INTO ${MODULE_TABLE} (  module_name, course_id ) VALUES (?, ?)`;

  pool.query(sql, [module_name, course_id], (error, result) => {
    if (error) {
      return res.status(500).send(errorResponse(error));
    }
    return res.status(201).send(
      successResponse("Module added Successfully with ID: " + result.insertId) 
    );// 201 means successfully created. 
  });
});
});

//http://localhost:7777/admin/update-module/3
router.put("/update-module/:moduleId", (req, res) => {
  let { moduleId } = req.params;
  let {  module_name, course_id } = req.body;


  moduleId = Number.parseInt(moduleId);
  if (Number.isNaN(moduleId) || moduleId < 0) {
    return res.status(400).send(errorResponse("Invalid module Id"))
  }


  if (typeof module_name !== "string" || module_name === "") {
    return res.status(400).json(errorResponse("invalid module name"))
  }

  course_id = Number.parseInt(course_id);
  if (Number.isNaN(course_id) || course_id < 0) {
    return res.status(400).send(errorResponse("Invalid course_id" ))
  }

  const sql = `UPDATE ${ MODULE_TABLE }
                SET  module_name = ?, course_id = ?
                WHERE module_id = ?`;

  pool.query(
    sql,
    [ module_name, course_id, moduleId],
    (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      console.log("result: ", result);

      if (result.affectedRows === 0) {
        return res.status(404).send(errorResponse("No Module found with this ID: " + moduleId));
      }
      return res.status(200).send(successResponse("Module details updated Successfully with ID: " + moduleId));
    
    }
  );
});

//http://localhost:7777/admin/delete-module/9
router.delete("/delete-module/:moduleId",(req,res) => {
  let { moduleId } = req.params;

   moduleId = Number.parseInt(moduleId);
  if (Number.isNaN(moduleId) || moduleId < 0) {
    return res.status(400).send(errorResponse("Invalid module Id"))
  }

  const sql = `DELETE FROM ${ MODULE_TABLE }
                WHERE module_id = ?`;
  pool.query(sql, [moduleId], (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    console.log("result:", result);

     if (result.affectedRows === 0) {
      return res.status(404).send(errorResponse("No Module Found with ID: " + moduleId));
    }
    return res.status(200).send(successResponse(
      " Module DELETED Successfully with ID: " + moduleId));
  
  });
});






module.exports = router;