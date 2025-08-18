const express = require("express");
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

const router = express.Router();

// GET all completed tasks for a staff
router.get("/show-all-completed-task/:staffId", (req, res) => {
  const { staffId } = req.params;

  const sql = `
    SELECT m.*, 
           u.first_name, 
           u.last_name, 
           st.roll_number, 
           st.prn_number, 
           \`module\`.module_name
    FROM marks m
    JOIN student st ON m.student_id = st.student_id
    JOIN user u ON st.user_id = u.user_id
    JOIN \`module\` ON m.module_id = \`module\`.module_id
    WHERE m.staff_id = ? AND m.status = 'Completed'
  `;

  pool.query(sql, [staffId], (error, results) => {
    if (error) return res.send(errorResponse(error));
    if (results.length === 0) return res.send(successResponse("No completed tasks found."));
    return res.send(successResponse(results));
  });
});

module.exports = router;
