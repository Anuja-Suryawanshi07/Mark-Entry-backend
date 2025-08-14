const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MODULE_TABLE } = require("../../config");

// POST: add new course
//http://localhost:7777/module/add-module
//  {
//             "course_id": 1,
//             "course_name": "DMC",
//             "batch_id": 1
//         },
// module_id, module_name, course_id

router.post("/add-module", (req, res) => {
  const { module_name, course_id } = req.body;

  if (typeof module_name !== "string" || module_name === "") {
    return res.status(400).json(errorResponse("Invalid Module Name"))
  }

  course_id = Number.parseInt(course_id);
  if (course_id === NaN || course_id < 0) {
    return res.status(400).send(errorResponse("Invalid Course Id"))
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

module.exports = router;
