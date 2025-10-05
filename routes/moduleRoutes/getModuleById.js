const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { MODULE_TABLE } = require("../../config");
const { successResponse, errorResponse } = require("../../utils/apiResponse");



// GET: get an module by Id
//http://localhost:7777/module/get-module/7

router.get("/get-module/:moduleId", (req, res) => {
  let { moduleId } = req.params;


  moduleId = Number.parseInt(moduleId);
  if (Number.isNaN(moduleId) || moduleId < 0) {
    return res.status(400).send(errorResponse("Invalid module Id"))
  }


  const sql = `SELECT * FROM ${MODULE_TABLE} WHERE module_id = ?`;

  pool.query(
    sql,
    [moduleId],
    (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      console.log("result: ", result);

      if (result.length === 0) {
        return res.status(404).send(errorResponse("No Module found with this ID: " + moduleId));
      }
      return res.status(200).send(successResponse(result[0]));
    }
  );
});

module.exports = router;
