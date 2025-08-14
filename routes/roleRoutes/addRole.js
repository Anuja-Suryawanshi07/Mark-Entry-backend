const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { ROLE_TABLE } = require("../../config");

//http://localhost:7777/roles/add-role
/*
  {
    "roleId": 7,
    "roleName": "Mentor"
  }
 */

router.post("/add-role", (req, res) => {
  const { roleName } = req.body;
  const sql = `INSERT INTO ${ROLE_TABLE} ( role_name ) VALUES (?)`;
  pool.query(sql, [roleName], (error, result) => {
    if (error) {
      // return res.send(error);
      return res
        .status(500)
        .json(errorResponse("An error occurred while adding the user."));
    }
    return res.status(201).json(
      successResponse({
        message: "Role added successfully.",
        roleId: result.insertId,
      })
    );
  });
  //   res.send("Role added");
});

module.exports = router;
