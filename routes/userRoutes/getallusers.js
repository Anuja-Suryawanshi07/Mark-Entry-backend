const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");



// GET all users
//http://localhost:7777/user/all-users

router.get("/all-users", (req, res) => {
  const sql = `SELECT * FROM ${USER_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No Such User."));
    }
    return res.send(successResponse(results));
  });
});

module.exports = router;
