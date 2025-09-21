const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

/**
 * POST: Register a new student
 * URL: http://localhost:7777/student/register
 * Logic:
 *   1. Insert basic user info into `user` table.
 *   2. Insert student info into `student` table.
 *   3. PRN and group_id are optional at this stage (stored as NULL).
 *   4. Email and mobile_number are validated for duplicates.
 */

router.post("/register", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    mobile_number,
    password,
    prn_number, // optional, can be empty initially
    group_id,   // optional, can be empty initially
  } = req.body || {};

  // ------------------------------
  // Step 0: Validate mandatory fields
  // ------------------------------
  if (!first_name || !last_name || !email || !mobile_number || !password) {
    return res.status(400).json({
      status: "Error",
      message: "First name, Last name, Email, Mobile number and Password are required",
    });
  }

  // ------------------------------
  // Step 1: Check for duplicate email or mobile number in user table
  // ------------------------------
  const checkUserSql = `
    SELECT * FROM user WHERE email = ? OR mobile_number = ?
  `;
  pool.query(checkUserSql, [email, mobile_number], (err, result) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }

    if (result.length > 0) {
      return res.status(400).json({ 
        status: "Error", 
        message: "Email or Mobile number already registered" 
      });
    }

    // ------------------------------
    // Step 2: Insert into user table
    // ------------------------------
    const insertUserSql = `
      INSERT INTO user (first_name, last_name, email, mobile_number, password, role_id)
      VALUES (?, ?, ?, ?, ?, 5)
    `;
    pool.query(
      insertUserSql,
      [first_name, last_name, email, mobile_number, password],
      (err2, userResult) => {
        if (err2) {
          return res.status(500).json({ status: "Error", message: err2.message });
        }

        const user_id = userResult.insertId; // Newly created user ID
        const student_name = `${first_name} ${last_name}`;

        // ------------------------------
        // Step 3: Prepare student info
        // PRN and group_id can be NULL if not provided
        // ------------------------------
        const safePrn = prn_number && prn_number.toString().trim() !== "" ? prn_number : null;
        const safeGroup = group_id && group_id.toString().trim() !== "" ? group_id : null;

        // ------------------------------
        // Step 4: Insert into student table
        // ------------------------------
        const insertStudentSql = `
          INSERT INTO student (prn_number, student_name, group_id, user_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, CURDATE(), CURDATE())
        `;
        pool.query(
          insertStudentSql,
          [safePrn, student_name, safeGroup, user_id],
          (err3, studentResult) => {
            if (err3) {
              return res.status(500).json({ status: "Error", message: err3.message });
            }

            // ------------------------------
            // Step 5: Return success response
            // ------------------------------
            return res.status(201).json({
              status: "Success",
              message: `Student registered successfully with Student ID: ${studentResult.insertId}`,
              user_id,
            });
          }
        );
      }
    );
  });
});

module.exports = router;
