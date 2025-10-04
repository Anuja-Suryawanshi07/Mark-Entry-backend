const express = require("express");

const promisePool = require("../../config/db-promise");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const crypto = require('crypto-js')
const router = express.Router();


router.post("/add-student-promise", async (req, res) => {

  let {
    first_name,
    last_name,
    email,
    mobile_number,
    password,
    prn_number, // optional, can be empty initially
    group_id,   // optional, can be empty initially
  } = req.body || {};


  // course_id = Number.parseInt(course_id);
  // if (Number.isNaN(course_id) || course_id < 0) {
  //   return res.status(400).send(errorResponse("Invalid course Id"))
  // }
  if (!first_name || !last_name || !email || !mobile_number || !password) {
    return res.status(400).json({
      status: "Error",
      message: "First name, Last name, Email, Mobile number and Password are required",
    });
  }

    password = String(crypto.SHA256(password.trim()));
  
  let connection = null;
  try {
    connection = await promisePool.getConnection();
    await connection.beginTransaction();

    const checkUserSql = `
    SELECT * FROM user WHERE email = ? OR mobile_number = ?
  `;
    let [checkUserResult] = await connection.query(checkUserSql, [email, mobile_number]);
    if (checkUserResult.length > 0) {
      return res.status(400).json(errorResponse(
        "Email or Mobile number already registered"
      ));
    }
    const insertUserSql = `
      INSERT INTO user (first_name, last_name, email, mobile_number, password, role_id)
      VALUES (?, ?, ?, ?, ?, 5)
    `;
    let [insertUserResult] = await connection.query(
      insertUserSql,
      [first_name, last_name, email, mobile_number, password]);

    const user_id = insertUserResult.insertId; // Newly created user ID
    const student_name = `${first_name} ${last_name}`;

    const safePrn = prn_number && prn_number.toString().trim() !== "" ? prn_number : null;
    const safeGroup = group_id && group_id.toString().trim() !== "" ? group_id : null;

    const insertStudentSql = `
          INSERT INTO student (prn_number, student_name, group_id, user_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, CURDATE(), CURDATE())
        `;
    const [insertStudentResult] = await connection.query(
      insertStudentSql,
      [safePrn, student_name, safeGroup, user_id]);
    await connection.commit();
    return res.status(201).send(successResponse("sucessful inserted student Id"));
  }
  catch (error) {
    console.log(err);
    if (connection !== null) {
      await connection.rollback();
    }
    return res.status(500).send(errorResponse(error));
  }
});

module.exports = router;
