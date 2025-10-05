const express = require("express");
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MARKS_TABLE, STUDENT_TABLE, USER_TABLE, MODULE_TABLE } = require("../../config");

const router = express.Router();

// GET all approved tasks for a staff
//http://localhost:5555/mentor/show-all-approved-task/:staffId
router.get("/show-all-approved-task", (req, res) => {
  const staffId = req.user.staffId;


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
    where (m.status = "Approved" or m.status="Completed") and st.staff_id=?;
  `;
console.log(req.user)
  pool.query(sql, [staffId], (error, results) => {
    if (error) return res.send(errorResponse(error));
    if (results.length === 0) return res.send(successResponse("No Approved tasks found."));
    return res.send(successResponse(results));
  });
});

module.exports = router;
