const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");



// POST: add new user
//http://localhost:7777/user/add-user

 /*
       {
         "firstname": "ash2",
         "lastname": "chavan1",
         "mobilenumber": "0987654327",
         "email": "abc12367@gmail.com",
         "password": "abc12367"
         }
  */

router.post("/add-user", (req, res) => {
  const { firstname, lastname, mobilenumber, email, password } = req.body;

  const sql = `INSERT INTO ${ USER_TABLE } ( first_name, last_name, mobile_number, email, password ) VALUES (?, ?, ?, ?, ?)`;

  pool.query(
    sql,
    [ firstname, lastname, mobilenumber, email, password],
    (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      return res.status(201).send({
        status: " Success",
        message: "User added Successfully with ID: " + result.insertId,
      });
    }
  );
});

module.exports = router;
