const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

const { MODULE_TABLE } = require("../../config");

// DELETE: delete an user
//http://localhost:7777/module/delete-module/2

router.delete("/delete-module/:moduleId",(req,res) => {
  const { moduleId } = req.params;
  const sql = `DELETE FROM ${ MODULE_TABLE }
                WHERE module_id = ?`;
  pool.query(sql, [moduleId], (error, result) => {
    if (error) {
      return res.send(error);
    }
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.send({
        status: "Success",
        message: "No Module Found with ID: " + moduleId,
      });
    }
    return res.send({
      status: "Success",
      message: " Module DELETED Successfully with ID: " + moduleId,
    });
  });
});

module.exports = router;