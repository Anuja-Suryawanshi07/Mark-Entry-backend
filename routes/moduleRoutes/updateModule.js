const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { MODULE_TABLE } = require("../../config");



// PUT: update an user by Id
//http://localhost:7777/module/update-module/3

router.put("/update-module/:moduleId", (req, res) => {
  const { moduleId } = req.params;
  const {  module_name, course_id } = req.body;

  const sql = `UPDATE ${ MODULE_TABLE }
                SET  module_name = ?, course_id = ?
                WHERE module_id = ?`;

  pool.query(
    sql,
    [ module_name, course_id, moduleId],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      console.log("result: ", result);

      if (result.affectedRows === 0) {
        return res.send({
          status: "Success",
          message: "No Module found with this ID: " + moduleId,
        });
      }
      return res.send({
        status: "Success",
        message: "Module details updated Successfully with ID: " + moduleId,
      });
    }
  );
});

module.exports = router;