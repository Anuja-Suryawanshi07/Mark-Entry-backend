const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");



// DELETE: delete an user
//http://localhost:7777/module/delete-module/2

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
