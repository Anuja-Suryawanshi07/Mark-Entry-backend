const express = require("express");

const router = express.Router();

// POST: Register a new staff
// Example: POST http://localhost:7777/staff/register
router.post("/register", (req, res) => {
  const { first_name, last_name, email, mobile_number, password, course_id } = req.body || {};

  // Validate all required fields
  if (!first_name || !last_name || !email || !mobile_number || !password) {
    return res
      .status(400)
      .json({ status: "Error", message: "All fields are required" });
  }

  // Insert into user with role_id = 4
  const sqlUser = `
    INSERT INTO user (first_name, last_name, email, mobile_number, password, role_id)
    VALUES (?, ?, ?, ?, ?, 4)
  `;

  pool.query(
    sqlUser,
    [first_name, last_name, email, mobile_number, password],
    (err, userResult) => {
      if (err) {
        return res.status(500).json({ status: "Error", message: err.message });
      }

      const user_id = userResult.insertId;
      const staff_name = `${first_name} ${last_name}`;
      const role_id = 4;

      // Insert into staff table
      const sqlStaff = `
        INSERT INTO staff (staff_name, user_id, role_id, course_id)
        VALUES (?, ?, ?, ?)
      `;

      pool.query(
        sqlStaff,
        [staff_name, user_id, role_id, course_id],
        (err2, staffResult) => {
          if (err2) {
            //this if else block help to not insert in to user table when staff insert is fail.
            pool.query("DELETE FROM user WHERE user_id = ?", [user_id], (deleteErr) => {
              if (deleteErr) {
                return res.status(500).json({
                  status: "Error",
                  message: "Staff insert failed, rollback user failed too",
                  details: deleteErr.message,
                });
              }
              return res.status(500).json({
                status: "Error",
                message: "Staff insert failed, user rolled back",
                details: err2.message,
              });
            });
          } else {
            // here both inserts succeeded
            return res.status(201).json({
              status: "Success",
              message: `Staff registered successfully with Staff ID: ${staffResult.insertId}`,
              user_id,
            });
          }
        }
      );
    }
  );
});

module.exports = router;
