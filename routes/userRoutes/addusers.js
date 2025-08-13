const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { USER_TABLE } = require("../../config");


// POST: add new user
//http://localhost:7777/users/add-user

router.post("/add-user", (req, res) => {
  const { userid, firstname, lastname, mobilenumber, email, password } =
    req.body;

  const sql = `INSERT INTO ${ USER_TABLE } ( user_id, first_name, last_name, mobile_number, email, password ) VALUES (?, ?, ?, ?, ?, ?)`;

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

module.exports = router;