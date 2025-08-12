const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MODULE_TABLE } = require("../../config");


// GET all users
//http://localhost:7777/modules/all-modules

router.get("/all-modules", (req, res) => {
  const sql = `SELECT * FROM ${MODULE_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No Such Module."));
    }
    return res.send(successResponse(results));
  });
});

module.exports = router;