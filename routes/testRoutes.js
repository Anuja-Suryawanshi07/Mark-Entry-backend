const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../utils/apiResponse");

//test route
router.get("/demo", (req, res) => {
  res.send(successResponse("Hello World"));
});

// GET all users
/* router.get("/all-users", (req, res) => {
  const sql = `SELECT * FROM USER`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No Such User."));
    }
    return res.send(successResponse(results));
  });
}); */

// POST: add new user

/* router.post("/add-user", (req, res) => {
  const { userid, firstname, lastname, mobilenumber, email, password } =
    req.body;

  const sql = `INSERT INTO USER ( user_id, first_name, last_name, mobile_number, email, password ) VALUES (?, ?, ?, ?, ?, ?)`;

  pool.query(
    sql,
    [userid, firstname, lastname, mobilenumber, email, password],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      return res.status(201).send({
        status: " Success",
        message: "User added Successfully with ID: " + result.insertId,
      });
    }
  );
});
 */
// PUT: update an user by Id

/* router.put("/update-user/:userId", (req, res) => {
  const { userId } = req.params;
  const { userid, firstname, lastname, mobilenumber, email, password } =
    req.body;

  const sql = `UPDATE USER
                SET user_id = ?, first_name = ?, last_name = ?, mobile_number = ?, email = ?, password = ?
                WHERE user_id = ?`;

  pool.query(
    sql,
    [userid, firstname, lastname, mobilenumber, email, password, userId],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      console.log("result: ", result);

      if (result.affectedRows === 0) {
        return res.send({
          status: "Success",
          message: "No User found with this ID: " + userid,
        });
      }
      return res.send({
        status: "Success",
        message: "User details updated Successfully with ID: " + userid,
      });
    }
  );
}); */

// DELETE: delete an user

/* router.delete("/delete/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = `DELETE FROM USER
                WHERE user_id = ?`;
  pool.query(sql, [userId], (error, result) => {
    if (error) {
      return res.send(error);
    }
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.send({
        status: "Success",
        message: "No User Found with ID: " + userId,
      });
    }
    return res.send({
      status: "Success",
      message: " User DELETED Successfully with ID: " + userId,
    });
  });
});
 */
module.exports = router;
