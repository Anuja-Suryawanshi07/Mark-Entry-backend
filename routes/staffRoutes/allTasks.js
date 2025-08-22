const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// GET: fetch tasks for staff (Pending, Submitted, Approved)
// Example: http://localhost:7777/staff/all-tasks

router.get("/all-tasks", (req, res) => {
  const sql = `
    SELECT 
      CONCAT(staff_user.first_name, ' ', staff_user.last_name) AS staff_name,
      CONCAT(student_user.first_name, ' ', student_user.last_name) AS student_name,
      g.group_name,
      mod_table.module_name,
      m.theory_marks,
      m.lab_marks,
      m.IA_1,
      m.IA_2,
      m.start_date,
      m.till_date,
      m.status
    FROM marks AS m
    LEFT JOIN student AS s ON m.student_id = s.student_id
    LEFT JOIN user AS student_user ON s.user_id = student_user.user_id
    LEFT JOIN staff AS st ON m.staff_id = st.staff_id
    LEFT JOIN user AS staff_user ON st.user_id = staff_user.user_id
    LEFT JOIN student_group AS g ON s.group_id = g.group_id
    LEFT JOIN module AS mod_table ON m.module_id = mod_table.module_id
  `;

  pool.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json(errorResponse("Database Error", error));
    }

    if (result.length === 0) {
      return res.status(404).json(errorResponse("No tasks found"));
    }

    const updatedResult = result.map(task => {
      // If coordinator has already marked as Approved, don’t override
      if (task.status === "Approved") {
        return task;
      }

      // Mentor has not filled marks yet → Pending
      if (
        task.theory_marks == null ||
        task.lab_marks == null ||
        task.IA_1 == null ||
        task.IA_2 == null
      ) {
        task.status = "Pending";
      } 
      // Mentor filled marks but coordinator has not approved yet → Submitted
      else {
        task.status = "Submitted";
      }

      return task;
    });

    return res
      .status(200)
      .json(successResponse(updatedResult, "Tasks fetched successfully"));
  });
});

module.exports = router;
