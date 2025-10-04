const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");



// GET all users
//http://localhost:7777/module/all-modules

router.get("/all-modules", (req, res) => {
  const sql = `SELECT * FROM ${MODULE_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error)); // 500 means vo jiska reason apne ko pata nahi
    }

    if (results.length === 0) {
      return res.status(404).send(errorResponse("No Such Module.")); // 404 means not found
    }
    return res.status(200).send(successResponse(results)); // 200 means success 
  });
});

module.exports = router;
