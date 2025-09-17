const express = require("express");
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MARKS_TABLE, STUDENT_TABLE, USER_TABLE, MODULE_TABLE } = require("../../config");

const router = express.Router();

// GET all approved tasks for a staff
//http://localhost:5555/mentor/show-all-approved-task/:staffId
router.get("/show-all-approved-task/:staffId", (req, res) => {
  const { staffId } = req.params;

  const sql = `
    SELECT m.*, 
           u.first_name, 
           u.last_name, 
           st.prn_number, 
           \`module\`.module_name
    FROM ${MARKS_TABLE} m
    JOIN ${STUDENT_TABLE} st ON m.student_id = st.student_id
    JOIN ${USER_TABLE} u ON st.user_id = u.user_id
    JOIN ${MODULE_TABLE} ON m.module_id = \`module\`.module_id
    WHERE m.staff_id = ? AND m.status = 'Approved'
  `;

  pool.query(sql, [staffId], (error, results) => {
    if (error) return res.send(errorResponse(error));
    if (results.length === 0) return res.send(successResponse("No Approved tasks found."));
    return res.send(successResponse(results));
  });
});

module.exports = router;
