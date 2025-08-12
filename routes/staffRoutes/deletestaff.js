const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STAFF_TABLE } = require("../../config");

// DELETE: delete an staff
//http://localhost:7777/staff/delete-staff/6

router.delete("/delete-staff/:staffId",(req,res) => {
  const { staffId } = req.params;
  const sql = `DELETE FROM ${ STAFF_TABLE }
                WHERE staff_id = ?`;
    pool.query(sql, [staffId], (error, result) => {
    if (error) {
      return res.send(error);
    }
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.send({
        status: "Success",
        message: "No Staff Found with ID: " + staffId,
      });
    }
    return res.send({
      status: "Success",
      message: " Staff DELETED Successfully with ID: " + staffId,
    });
  });
});

module.exports = router;            