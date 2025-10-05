const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");


const { ROLE_TABLE } = require("../../config");

//http://localhost:7777/roles/all-roles

router.get("/all-roles", (req, res) => {
  const sql = `SELECT * FROM ${ROLE_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No Such Roles."));
    }
    return res.send(successResponse(results));
  });
});

module.exports = router;
