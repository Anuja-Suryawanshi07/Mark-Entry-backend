const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

//POST: Register a new user
//http://localhost:7777/user/register

/*
  {
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "mobile_number": "9653111201",
  "password": "SecurePass123",
  "role_id": 2
}
 */

router.post("/register", (req, res) => {
  const { first_name, last_name, email, mobile_number, password, role_id } =
    req.body || {};

  // validate required fields
  if (
    !first_name ||
    !last_name ||
    !email ||
    !mobile_number ||
    !password ||
    !role_id
  ) {
    return res
      .status(400)
      .json({ status: "Error", message: "All fields are required" });
  }

  //Insert into user

  const sqlUser = `INSERT INTO user (first_name, last_name, email, mobile_number, password, role_id) VALUES (?, ?, ?, ?, ?, ?)`;

  pool.query(
    sqlUser,
    [first_name, last_name, email, mobile_number, password, role_id],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ status: "Error", message: error.message });
      }
      return res.status(201).json({
        status: "Success",
        message: `User registered successfully with User ID: ${result.insertId}`,
        user_id: result.insertId,
      });
    }
  );
});

module.exports = router;
