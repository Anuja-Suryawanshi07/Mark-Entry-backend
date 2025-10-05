const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { USER_TABLE } = require("../../config");

// DELETE: delete an user
//http://localhost:7777/user/delete-users/7

router.delete("/delete-users/:userId",(req,res) => {
  const { userId } = req.params;
  const sql = `DELETE FROM ${ USER_TABLE }
                WHERE user_id = ?`;
  pool.query(sql, [userId], (error, result) => {
    if (error) {
      return res.send(errorResponse(error));
    }
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.send({
        status: "Error",
        message: "No User Found with ID: " + userId,
      });
    }
    return res.send({
      status: "Success",
      message: " User DELETED Successfully with ID: " + userId,
    });
  });
});

module.exports = router;
