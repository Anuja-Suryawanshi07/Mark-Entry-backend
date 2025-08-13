const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { USER_TABLE } = require("../../config");



// PUT: update an user by Id
//http://localhost:7777/users/update-users/6

router.put("/update-users/:userId", (req, res) => {
  const { userId } = req.params;
  const { firstname, lastname, mobilenumber, email, password } =
    req.body;

  const sql = `UPDATE ${ USER_TABLE }
                SET first_name = ?, last_name = ?, mobile_number = ?, email = ?, password = ?
                WHERE user_id = ?`;

  pool.query(
    sql,
    [ firstname, lastname, mobilenumber, email, password, userId],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      console.log("result: ", result);

      if (result.affectedRows === 0) {
        return  res.status(404).send({
          status: "Error",
          message: "No User found with this ID: " + userId,
        });
      }
      return res.status(200).send({
        status: "Success",
        message: "User details updated Successfully with ID: " + userId,
      });
    }
  );
});

module.exports = router;