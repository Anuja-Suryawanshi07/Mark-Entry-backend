const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const crypto = require("crypto-js");

const USER_TABLE = "user";
const STUDENT_TABLE = "student";

// Helpers
const errorResponse = (message) => ({
  status: "Error",
  message: typeof message === "string" ? message : message.sqlMessage || message,
});

const successResponse = (message, data = {}) => ({
  status: "Success",
  message,
  ...data,
});

// POST: Register a new student
/*
 {
  "firstName": "Niranjan",
  "lastName": "Sathe",
  "email": "neeru1@example.com",
  "mobileNumber": "6479185230",
  "password": "neeru123"
}
 */

router.post("/register", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
    prnNumber,
    groupId,
  } = req.body || {};

  // Validate required fields
  if (!firstName || !lastName || !email || !mobileNumber || !password) {
    return res.status(400).json(
      errorResponse("First name, Last name, Email, Mobile number, and Password are required")
    );
  }

  const hashPassword = String(crypto.SHA256(password));

  // Step 1: Check if user already exists
  const checkSQL = `SELECT * FROM ${USER_TABLE} WHERE email = ? OR mobile_number = ?`;
    pool.query(checkSQL, [email, mobileNumber], (error, result) => {
    if (error) {
      return res.status(500).json(errorResponse(error));
    }

    if (result.length > 0) {
      return res.status(400).json(errorResponse("Email or Mobile number already exists."));
    }

    // Step 2: Insert into user table
    const insertUserSQL = `
      INSERT INTO ${USER_TABLE} (first_name, last_name, email, mobile_number, password, role_id)
      VALUES (?, ?, ?, ?, ?, 5)
    `;
  
    pool.query(
      insertUserSQL,
      [firstName, lastName, email, mobileNumber, hashPassword],
      (error, insertResult) => {
        if (error) {
          return res.status(500).json(errorResponse(error));
        }

        const userId = insertResult.insertId;
        const studentName = `${firstName} ${lastName}`;

        // Step 3: Insert into student table
        const insertStudentSQL = `
          INSERT INTO ${STUDENT_TABLE} (prn_number, student_name, group_id, user_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, NOW(), NOW())
        `;
        const values = [
          prnNumber && String(prnNumber).trim() !== "" ? prnNumber : null,
          studentName,
          groupId && String(groupId).trim() !== "" ? groupId : null,
          userId,
        ];
        pool.query(insertStudentSQL, values, (error, studentResult) => {
          if (error) {
            return res.status(500).json(errorResponse(error));
          }
          return res.status(201).json(
            successResponse("Student registered successfully.", {
              userId,
              studentId: studentResult.insertId,
            })
          );
        });
      }
    );
  });
});

module.exports = router;
