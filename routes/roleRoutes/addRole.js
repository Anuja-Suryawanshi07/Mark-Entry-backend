const express = require("express");
const router = express.Router();

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
  const { roleId,roleName } = req.body;
  const sql = `INSERT INTO ${ROLE_TABLE} (role_id, role_name) VALUES (?, ?)`;

  if (!roleName) {
    return res.status(400).json(errorResponse("Role Name field should not empty."));
  }
  
  pool.query(sql, [roleId,roleName], (error, result) => {
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

