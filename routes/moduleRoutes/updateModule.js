const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { MODULE_TABLE } = require("../../config");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// PUT: update an user by Id
//http://localhost:7777/module/update-module/3

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

module.exports = router;
