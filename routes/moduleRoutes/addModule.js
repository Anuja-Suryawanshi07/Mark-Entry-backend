const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MODULE_TABLE } = require("../../config");


// POST: add new course
//http://localhost:7777/modules/add-module
//  {
//             "course_id": 1,
//             "course_name": "DMC",
//             "batch_id": 1
//         },
// module_id, module_name, course_id

router.post("/add-module", (req, res) => {
  
  const {  module_name, course_id } = req.body;
     

  const sql = `INSERT INTO ${ MODULE_TABLE } (  module_name, course_id ) VALUES (?, ?)`;

  pool.query(
    sql,
    [module_name, course_id],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      return res.status(201).send({
        status: " Success",
        message: "User added Successfully with ID: " + result.insertId,
      });
    }
  );
});

module.exports = router;