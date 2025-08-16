const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

const { STAFF_TABLE } = require("../../config");
const { errorResponse, successResponse } = require("../../utils/apiResponse");

// DELETE: delete an user
//http://localhost:7777/admin/delete-staff/7

router.delete("/delete-staff/:staffId", (req, res) => {
  let { staffId } = req.params;
  
  staffId = Number.parseInt(staffId);
  if (Number.isNaN(staffId) || staffId < 0) {
    return res.status(400).send(errorResponse("Invalid staff Id"))
  }

  const sql = `DELETE FROM ${STAFF_TABLE}
                WHERE staff_id = ?`;
  pool.query(sql, [staffId], (error, result) => {
    if (error) {
      return res.status(500).send(errorResponse(error));
    }
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).send(errorResponse("No Staff Found with ID: " + staffId));
    }
    return res.status(200).send(successResponse(
      " Staff DELETED Successfully with ID: " + staffId));
  });
});

module.exports = router;