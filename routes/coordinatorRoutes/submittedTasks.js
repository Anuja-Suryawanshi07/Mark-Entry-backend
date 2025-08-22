const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// ✅ GET: All tasks submitted by mentors (waiting for coordinator approval)
// Example: GET http://localhost:7777/coordinator/submitted-tasks
router.get("/submitted-tasks", (req, res) => {
  const sql = `
    SELECT 
      m.mark_id,
      CONCAT(staff_user.first_name, ' ', staff_user.last_name) AS mentor_name,
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
    WHERE m.status = 'Submitted';
  `;

  pool.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json(errorResponse("Database Error", error));
    }

    if (result.length === 0) {
      return res.status(404).json(errorResponse("No submitted tasks found"));
    }

    return res
      .status(200)
      .json(successResponse(result, "Submitted tasks fetched successfully"));
  });
});

module.exports = router;