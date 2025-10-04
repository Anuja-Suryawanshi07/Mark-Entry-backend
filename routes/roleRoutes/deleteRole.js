const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");


//http://localhost:7777/roles/delete-role/6

router.delete("/delete-role/:roleId", (req, res) => {
  const { roleId } = req.params;

  const sql = `DELETE FROM ${ROLE_TABLE} WHERE role_id = ?`;

  pool.query(sql, [roleId], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json(errorResponse("An error occurred while deleting the role."));
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(errorResponse("No role found with the given ID."));
    }

    return res.status(200).json(
      successResponse({
        message: "Role deleted successfully.",
        roleId: roleId,
      })
    );
  });
});

module.exports = router;


