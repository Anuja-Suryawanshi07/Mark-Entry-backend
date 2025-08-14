const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { ROLE_TABLE } = require("../../config");

//http://localhost:7777/roles/update-role/6

router.put("/update-role/:roleId", (req, res) => {
  const { roleId } = req.params;
  const { roleName } = req.body;

  if (!roleName) {
    return res.status(400).json(errorResponse("Role Name field should not empty."));
  }

  const sql = `UPDATE ${ROLE_TABLE} SET role_name = ? WHERE role_id = ?`;

  pool.query(sql, [roleName, roleId], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json(errorResponse("An error occurred while updating the role."));
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(errorResponse("No role found with the given ID."));
    }

    return res.status(200).json(
      successResponse({
        message: "Role updated successfully.",
        roleId: roleId,
      })
    );
  });
});

module.exports = router;
